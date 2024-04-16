import supertest from "supertest";
import app from "../src/server";
import { execSync } from "child_process";
import { type IUser } from "../src/domain/models/User";

const request = supertest(app);
beforeAll(() => {
  execSync("npm run seed-db");
});

describe("User Controller", () => {
  let userToDelete: IUser;

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
    userToDelete = user;
    expect(body.statusCode).toBe(201);
    expect(user.firstName).toBe("any-firstName");
    expect(user.surname).toBe("any-surname");
    expect(user.email).toBe("any-email@mail.com");
    expect(user.role).toBe("USER");
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });

  test("DELETE deleteUser - Should return 200", async () => {
    const { body } = await request
      .delete(`/api/v1/user/${userToDelete.id}`)
      .expect(200);

    const user = body.body;
    expect(body.statusCode).toBe(200);
    expect(user).toEqual(userToDelete);
  });

  test("DELETE deleteUser - Should return 404 if no id param is provided", async () => {
    const { body } = await request.delete("/api/v1/user/").expect(404);

    const user = body.body;
    expect(body.statusCode).toBe(404);
    expect(user).toEqual("Path not found");
  });

  test("DELETE deleteUser - Should return 404 if invalid id param is provided", async () => {
    const { body } = await request
      .delete("/api/v1/user/invalid-id")
      .expect(404);

    const user = body.body;
    expect(body.statusCode).toBe(404);
    expect(user).toEqual({ error: "Resource not found" });
  });
});
