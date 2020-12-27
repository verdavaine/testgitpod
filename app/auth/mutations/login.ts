import bcrypt from "bcrypt"
import { AuthenticationError, Ctx } from "blitz"
import { authenticateUser } from "app/auth/auth-utils"
import { LoginInput, LoginInputType } from "../validations"
import db from "db"
import signup from "./signup"

//type GetOlduserInput = Pick<Prisma.FindFirstOlduserArgs, "where">

export default async function login(input: LoginInputType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, password } = LoginInput.parse(input)

  // This throws an error if credentials are invalid
  try {
    const user = await authenticateUser(email, password)
    console.log("found")
    await session.create({ userId: user.id, roles: [user.role] })
    return user
  } catch (error) {
    if (error instanceof AuthenticationError) {
      const olduser = await db.olduser.findFirst({ where: { email } })
      if (await bcrypt.compare(password, olduser?.hash || "")) {
        const user = await signup({ email, password }, { session })
        return user
      } else throw new AuthenticationError()
    } else throw error
  }
}
