const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
    describe("given a username, email and password", () => {
        test("should respond with a 200 status code, response body as expected", async () => {
            const response = await request(app).post("/api/auth/register").send({
                username: "demo4",
                email: "demo4@gmail.com",
                password: "123456789"
            })
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBeTruthy();
            expect(response.body.user.username).toBe("demo4");
        })
    })
})