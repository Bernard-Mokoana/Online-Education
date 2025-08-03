import request from "supertest";
import app from "../src/app.js";

describe("User API", () => {
  it("register a new user", async () => {
    const res = await request(app).post("/api/v1/users/register").send({
      firstName: "Bernard",
      lastName: "Mokoana",
      email: "bernard@gmail.com",
      password: "Bernard@123",
      role: "Student",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.newUser).toHaveProperty("_id");
    expect(res.body.newUser.email).toBe("bernard@gmail.com");
  });

  it("login a user", async () => {
    await request(app).post("/api/v1/users/register").send({
      firstName: "Dira",
      lastName: "Mokoana",
      email: "dira@gmail.com",
      password: "Dira@123",
      role: "Student",
    });

    const res = await request(app).post("/api/v1/users/login").send({
      email: "dira@gmail.com",
      password: "Dira@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
