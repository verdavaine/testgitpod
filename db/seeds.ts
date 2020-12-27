import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  await db.olduser.create({
    data: {
      login: "rv",
      email: "herve.verdavaine@gmail.com",
      hash: "$2a$10$lzYq7BTnBI0AtvDqUIWNfu4DP6C0OmyQ2NPMhd1qvL2ztB9ph15y6",
    },
  })
  await db.olduser.create({
    data: {
      login: "paul",
      email: "paul75011@gmail.com",
      hash: "$2a$10$5966t0.TdYlina/BD/JARO.T4aRZTpQTMcuHg5lEDeo7dWqc7iOAq",
    },
  })
}

export default seed
