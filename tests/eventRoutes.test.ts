import supertest from "supertest";
import app from "../src/server";
import { execSync } from "child_process";
// import { type IEvent } from "../src/domain/models/Event";

const request = supertest(app);
beforeAll(() => {
  execSync("npm run seed-db");
});

describe("Event Controller", () => {
  // let eventToDelete: IEvent;

  test("POST crateEvent - Should return 400 if name is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: name" });
  });

  test("POST crateEvent - Should return 400 if dateStart is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: dateStart" });
  });

  test("POST crateEvent - Should return 400 if dateEnd is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: dateEnd" });
  });

  test("POST crateEvent - Should return 400 if location is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: location" });
  });

  test("POST crateEvent - Should return 400 if categoryId is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: categoryId" });
  });

  test("POST crateEvent - Should return 400 if price is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: price" });
  });

  test("POST crateEvent - Should return 400 if description is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: description" });
  });

  test("POST crateEvent - Should return 400 if userId is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: userId" });
  });

  test("POST crateEvent - Should return 400 if capacity is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: capacity" });
  });

  test("POST crateEvent - Should return 400 if logoUrl is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({ message: "Missing param: logoUrl" });
  });

  test("POST crateEvent - Should return 400 if categoryId provided not exist", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        location: "London",
        categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc755",
        price: "39.99",
        description:
          "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
        userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
        capacity: 5000,
        logoUrl: "https://example.com/summer-music-festival-logo.png",
        information:
          "For tickets and more information, visit summermusicfestival.com",
      })
      .expect(400);

    expect(body.statusCode).toBe(400);
    expect(body.body).toEqual({
      message: "Invalid param: userId or categoryId not found",
    });
  });

  test("POST crateEvent - Should return 201 with correct data were provided", async () => {
    const eventBody = {
      name: "Summer Music Festival",
      dateStart: "2024-07-20T10:00:00.000Z",
      dateEnd: "2024-07-22T23:59:59.000Z",
      location: "London",
      categoryId: "05e6ec62-d72b-44a7-9bb7-ebc3fbbdc700",
      price: "39.99",
      description:
        "The Summer Music Festival is a three-day celebration of music, featuring top artists from various genres performing on multiple stages. Held in the heart of London, this festival attracts music lovers from around the world. With a diverse lineup, delicious food vendors, and a vibrant atmosphere, it's an event not to be missed!",
      userId: "2a5687de-7730-4725-83f8-faf3a5ccce19",
      capacity: 5000,
      logoUrl: "https://example.com/summer-music-festival-logo.png",
      information:
        "For tickets and more information, visit summermusicfestival.com",
    };
    const { body } = await request
      .post("/api/v1/event")
      .send(eventBody)
      .expect(201);

    const event = body.body;
    // eventToDelete = event;

    expect(body.statusCode).toBe(201);
    expect(event.id).not.toBe(null);
    expect(event.name).toBe(eventBody.name);
    expect(event.dateStart).toBe(eventBody.dateStart);
    expect(event.dateEnd).toBe(eventBody.dateEnd);
    expect(event.price).toBe(eventBody.price);
    expect(event.description).toBe(eventBody.description);
    expect(event.information).toBe(eventBody.information);
    expect(event.userId).toBe(eventBody.userId);
    expect(event.capacity).toBe(eventBody.capacity);
    expect(event.categoryId).toBe(eventBody.categoryId);
    expect(event.logoUrl).toBe(eventBody.logoUrl);
    expect(event.location).toBe(eventBody.location);
    expect(event.importedDate).toBe(null);
    expect(event.importedId).toBe(null);
    expect(event.createdAt).not.toBe(null);
    expect(event.updatedAt).not.toBe(null);
  });
});
