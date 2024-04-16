import supertest from "supertest";
import app from "../src/server";
import { execSync } from "child_process";

const request = supertest(app);
beforeAll(() => {
  execSync("npm run seed-db");
});

describe("User Controller", () => {
  test("POST crateUser - Should return 400 if first name is not provided", async () => {
    await request
      .post("/api/v1/user")
      .send({
        surname: "any-surname",
        email: "any-email@mail.com",
        role: "USER",
      })
      .expect(400);
  });

  test("POST crateUser - Should return 400 if surname is not provided", async () => {
    await request
      .post("/api/v1/user")
      .send({
        firstName: "any-firstName",
        email: "any-email@mail.com",
        role: "USER",
      })
      .expect(400);
  });

  test("POST crateUser - Should return 400 if email is not provided", async () => {
    await request
      .post("/api/v1/user")
      .send({
        firstName: "any-firstName",
        surname: "any-surname",
        role: "USER",
      })
      .expect(400);
  });

  test("POST crateUser - Should return 400 if role is not provided", async () => {
    await request
      .post("/api/v1/user")
      .send({
        firstName: "any-firstName",
        surname: "any-surname",
        email: "any-email@mail.com",
      })
      .expect(400);
  });

  test("POST crateUser - Should return 400 if invalid email provided", async () => {
    await request
      .post("/api/v1/user")
      .send({
        firstName: "any-firstName",
        surname: "any-surname",
        email: "invalid-email",
        role: "USER",
      })
      .expect(400);
  });

  test("POST crateUser - Should return 201 with correct data were provided", async () => {
    const { body } = await request
      .post("/api/v1/user")
      .send({
        firstName: "any-firstName",
        surname: "any-surname",
        email: "any-email@mail.com",
        role: "USER",
      })
      .expect(201);

    const user = body.body;
    expect(body.statusCode).toBe(201);
    expect(user.firstName).toBe("any-firstName");
    expect(user.surname).toBe("any-surname");
    expect(user.email).toBe("any-email@mail.com");
    expect(user.role).toBe("USER");
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });
});
