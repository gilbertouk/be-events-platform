import supertest from "supertest";
import app from "../src/server";
import { execSync } from "child_process";
import { type ICategory } from "src/domain/models/Category";

const request = supertest(app);
beforeAll(() => {
  execSync("npm run seed-db");
});

describe("Category Controller", () => {
  let categoryToDelete: ICategory;

  test("POST crateCategory - Should return 400 if no name is provided", async () => {
    const { body } = await request
      .post("/api/v1/category")
      .send({
        icon: "any-icon",
      })
      .expect(400);
    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ error: "Missing param: name" });
  });

  test("POST crateCategory - Should return 400 if no icon is provided", async () => {
    const { body } = await request
      .post("/api/v1/category")
      .send({
        name: "any-name",
      })
      .expect(400);
    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ error: "Missing param: icon" });
  });

  test("POST crateCategory - Should return 201 with correct values that were provided", async () => {
    const { body } = await request
      .post("/api/v1/category")
      .send({
        name: "any-name",
        icon: "any-icon",
      })
      .expect(201);
    const category = body.body;
    categoryToDelete = category;
    expect(body.statusCode).toBe(201);
    expect(category.name).toBe("any-name");
    expect(category.icon).toBe("any-icon");
    expect(category).toHaveProperty("id");
    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("icon");
    expect(category).toHaveProperty("createdAt");
    expect(category).toHaveProperty("updatedAt");
  });

  test("DELETE deleteCategory - Should return 200", async () => {
    const { body } = await request
      .delete(`/api/v1/category/${categoryToDelete.id}`)
      .expect(200);

    const category = body.body;
    expect(body.statusCode).toBe(200);
    expect(category).toEqual(categoryToDelete);
  });

  test("DELETE deleteCategory - Should return 404 if no id param is provided", async () => {
    const { body } = await request.delete("/api/v1/category/").expect(404);

    const category = body.body;
    expect(body.statusCode).toBe(404);
    expect(category).toEqual("Path not found");
  });

  test("DELETE deleteCategory - Should return 404 if invalid id param is provided", async () => {
    const { body } = await request
      .delete("/api/v1/category/invalid-id")
      .expect(404);

    const category = body.body;
    expect(body.statusCode).toBe(404);
    expect(category).toEqual({ error: "Resource not found" });
  });

  test("GET getCategories - Should return 200", async () => {
    await request.get("/api/v1/category/all").expect(200);
  });

  test("GET getCategories - Should return all categories on database", async () => {
    const { body } = await request.get("/api/v1/category/all");
    const categories = body.body;
    expect(categories.length).toBe(12);
    categories.forEach((category: ICategory) => {
      expect(category).toHaveProperty("id");
      expect(category).toHaveProperty("name");
      expect(category).toHaveProperty("icon");
      expect(category).toHaveProperty("createdAt");
      expect(category).toHaveProperty("updatedAt");
    });
  });
});
