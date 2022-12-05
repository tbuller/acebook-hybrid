const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/profiles", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
      .post("/profiles")
      .send({fullname: "Poppy Pepper", email: "poppy@email.com", password: "1234"})
      expect(response.statusCode).toBe(201)
    })

    test("a user has a full name recorded", async () => {
      await request(app)
        .post("/profiles")
        .send({fullname: "Red", email: "scarlett@email.com", password: "1234"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      console.log(users)
      console.log(newUser.email)
      console.log(newUser.fullname)
      expect(newUser.fullname).toEqual("Red")
    })
  })
})