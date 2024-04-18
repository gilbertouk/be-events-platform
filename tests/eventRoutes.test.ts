import supertest from "supertest";
import app from "../src/server";
import { execSync } from "child_process";
import { type IEvent } from "../src/domain/models/Event";

const request = supertest(app);
beforeAll(() => {
  execSync("npm run seed-db");
});

describe("Event Controller", () => {
  let eventToDelete: IEvent;

  test("POST crateEvent - Should return 400 if name is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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

  test("POST crateEvent - Should return 400 if city is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
    expect(body.body).toEqual({ message: "Missing param: city" });
  });

  test("POST crateEvent - Should return 400 if address is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        city: "London",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
    expect(body.body).toEqual({ message: "Missing param: address" });
  });

  test("POST crateEvent - Should return 400 if postcode is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        city: "London",
        address: "123 Maple Street",
        country: "United Kingdom",
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
    expect(body.body).toEqual({ message: "Missing param: postcode" });
  });

  test("POST crateEvent - Should return 400 if country is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
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
    expect(body.body).toEqual({ message: "Missing param: country" });
  });

  test("POST crateEvent - Should return 400 if categoryId is not provided", async () => {
    const { body } = await request
      .post("/api/v1/event")
      .send({
        name: "Summer Music Festival",
        dateStart: "2024-07-20T10:00:00Z",
        dateEnd: "2024-07-22T23:59:59Z",
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
        city: "London",
        address: "123 Maple Street",
        postcode: "SW1A 1AA",
        country: "United Kingdom",
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
      city: "London",
      address: "123 Maple Street",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
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
    eventToDelete = event;

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
    expect(event.city).toBe(eventBody.city);
    expect(event.importedDate).toBe(null);
    expect(event.importedId).toBe(null);
    expect(event.createdAt).not.toBe(null);
    expect(event.updatedAt).not.toBe(null);
  });

  test("GET fetchEventById - Should return 200 with correct event", async () => {
    const { body } = await request
      .get(`/api/v1/event/${eventToDelete.id}`)
      .expect(200);

    const event = body.body;
    expect(body.statusCode).toBe(200);
    expect(event.id).toBe(eventToDelete.id);
    expect(event.name).toBe(eventToDelete.name);
    expect(event.dateStart).toBe(eventToDelete.dateStart);
    expect(event.dateEnd).toBe(eventToDelete.dateEnd);
    expect(event.price).toBe(eventToDelete.price);
    expect(event.description).toBe(eventToDelete.description);
    expect(event.information).toBe(eventToDelete.information);
    expect(event.userId).toBe(eventToDelete.userId);
    expect(event.capacity).toBe(eventToDelete.capacity);
    expect(event.categoryId).toBe(eventToDelete.categoryId);
    expect(event.logoUrl).toBe(eventToDelete.logoUrl);
    expect(event.city).toBe(eventToDelete.city);
    expect(event.importedDate).toBe(eventToDelete.importedDate);
    expect(event.importedId).toBe(eventToDelete.importedId);
    expect(event.createdAt).toBe(eventToDelete.createdAt);
    expect(event.updatedAt).toBe(eventToDelete.updatedAt);
    expect(event.viewCount).toBe(eventToDelete.viewCount);
  });

  test("GET fetchEventById - Should return 200 with correct viewCount", async () => {
    const { body } = await request
      .get(`/api/v1/event/${eventToDelete.id}`)
      .expect(200);

    const event = body.body;
    expect(event.id).toBe(eventToDelete.id);
    expect(event.viewCount).toBe(eventToDelete.viewCount + 1);
  });

  test("GET fetchEventById - Should return 400 if invalid-id provided", async () => {
    const { body } = await request.get("/api/v1/event/invalid").expect(404);

    expect(body.statusCode).toBe(404);
    expect(body.body).toEqual({ error: "Resource not found" });
  });

  test("DELETE deleteEvent - Should return 200", async () => {
    const { body } = await request
      .delete(`/api/v1/event/${eventToDelete.id}`)
      .expect(200);

    const event = body.body;
    expect(body.statusCode).toBe(200);
    expect(event.id).toBe(eventToDelete.id);
  });

  test("DELETE deleteEvent - Should return 404 if no id param is provided", async () => {
    const { body } = await request.delete("/api/v1/event/").expect(404);

    const event = body.body;
    expect(body.statusCode).toBe(404);
    expect(event).toEqual("Path not found");
  });

  test("DELETE deleteEvent - Should return 404 if invalid id param is provided", async () => {
    const { body } = await request
      .delete(`/api/v1/event/${eventToDelete.id}`)
      .expect(404);

    const event = body.body;
    expect(body.statusCode).toBe(404);
    expect(event).toEqual({ error: "Resource not found" });
  });

  test("DELETE deleteEvent - Should return 400 if event has already sold an ticket", async () => {
    const { body } = await request
      .delete("/api/v1/event/d7d005e0-0670-4fa8-81fd-3a2a1a930379")
      .expect(400);

    const event = body.body;
    expect(body.statusCode).toBe(400);
    expect(event).toEqual({
      message: "Event cannot be deleted because a ticket has already been sold",
    });
  });

  test("GET fetchEvents - Should return 200 with correct data", async () => {
    const { body } = await request
      .get("/api/v1/events?page=1&limit=9")
      .expect(200);

    const { events, _count } = body.body;
    expect(body.statusCode).toBe(200);
    if (events.length > 0) {
      expect(body.body).toHaveProperty("_count");
      expect(typeof _count).toBe("number");
      events.forEach((event: IEvent) => {
        expect(event).toHaveProperty("name");
        expect(event).toHaveProperty("dateStart");
        expect(event).toHaveProperty("dateEnd");
        expect(event).toHaveProperty("price");
        expect(event).toHaveProperty("description");
        expect(event).toHaveProperty("information");
        expect(event).toHaveProperty("userId");
        expect(event).toHaveProperty("capacity");
        expect(event).toHaveProperty("categoryId");
        expect(event).toHaveProperty("logoUrl");
        expect(event).toHaveProperty("city");
        expect(event).toHaveProperty("importedDate");
        expect(event).toHaveProperty("importedId");
        expect(event).toHaveProperty("createdAt");
        expect(event).toHaveProperty("updatedAt");
      });
    }
  });

  test("GET fetchEvents - Should return 400 if page query is not provided", async () => {
    const { body } = await request.get("/api/v1/events?limit=9").expect(400);

    const event = body.body;
    expect(body.statusCode).toBe(400);
    expect(event.message).toBe("Missing query: page");
  });

  test("GET fetchEvents - Should return 400 if provided invalid value to page query", async () => {
    const { body } = await request
      .get("/api/v1/events?page=invalid&limit=9")
      .expect(400);

    const event = body.body;
    expect(body.statusCode).toBe(400);
    expect(event.message).toBe("Invalid query: page");
  });

  test("GET fetchEvents - Should return 400 if limit query is not provided", async () => {
    const { body } = await request.get("/api/v1/events?page=1").expect(400);

    const event = body.body;
    expect(body.statusCode).toBe(400);
    expect(event.message).toBe("Missing query: limit");
  });

  test("GET fetchEvents - Should return 400 if provided invalid value to limit query", async () => {
    const { body } = await request
      .get("/api/v1/events?page=1&limit=invalid")
      .expect(400);

    const event = body.body;
    expect(body.statusCode).toBe(400);
    expect(event.message).toBe("Invalid query: limit");
  });

  test("GET fetchEvents - Should return 200 with trending events", async () => {
    const { body } = await request.get("/api/v1/events/trending").expect(200);

    const events: IEvent[] = body.body;
    expect(body.statusCode).toBe(200);
    if (events.length > 1) {
      for (let i = 0; i < events.length - 1; i++) {
        expect(events[i].viewCount).toBeGreaterThanOrEqual(
          events[i + 1].viewCount,
        );
      }
    }
  });
});
