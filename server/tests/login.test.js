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

describe("POST /api/auth/login", () => {
    describe("given a username and password", () => {
        test("should respond with a 200 status code, response body as expected", async () => {
            const response = await request(app).post("/api/auth/login").send({
                username: "demo",
                password: "123456789"
            })
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBeTruthy();
            expect(response.body.user.username).toBe("demo");
        })
    })
    describe("given a wrong username or password", () => {
        test("should response with a 200 status code, response incorrect username", async () => {
            const response = await request(app).post("/api/auth/login").send({
                username:'demo9',
                password: "123456789"
            })
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe("Incorrect username")
        });

        test("should response with a 200 status code, response incorrect password", async () => {
            const response = await request(app).post("/api/auth/login").send({
                username:'demo',
                password: "1234567890"
            })
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toBe("Incorrect password")
        });

    })
})