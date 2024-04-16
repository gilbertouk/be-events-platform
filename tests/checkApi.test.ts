import supertest from "supertest";
import app from "../src/server";

describe("check api status", () => {
  test("should return 200", async () => {
    const res = await supertest(app).get("/api/v1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Api Okay!" });
  });
});
