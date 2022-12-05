const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const TokenGenerator = require("../../models/token_generator");
const JWT = require("jsonwebtoken");
let token;

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234" });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarlett@email.com", password: "1234" });
      let users = await User.find();
      let newUser = users[users.length - 1];
      console.log(users);
      console.log(newUser.email);
      expect(newUser.email).toEqual("scarlett@email.com");
    });

    test("a user is created with a fullname too", async () => {
      await request(app).post("/users").send({
        email: "scarlett@email.com",
        password: "1234",
        fullname: "jeffjeffs",
      });
      let users = await User.find();
      let newUser = users[users.length - 1];
      // console.log(users);
      // console.log(newUser.email);
      expect(newUser.fullname).toEqual("jeffjeffs");
    });
    test("a user's fullname can be edited", async () => {
      const user = new User({ email: "test@test.com", password: "12345678", fullname: "jeffjeffs" });
      await user.save();
      token = TokenGenerator.jsonwebtoken(user.id);

      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.fullname).toEqual("jeffjeffs");
      
      await request(app).post("/profiles").send({
        fullname: "Scarlet Actually",
        token: token,
      });
      console.log("test hello")
      expect(newUser.fullname).toEqual("Scarlet Actually"); //THIS FAILS BUT PROBABLY SHOULDN'T, CHECK USING POSTMAN
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});
