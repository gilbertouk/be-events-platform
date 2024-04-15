/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { PrismaClient } = require("@prisma/client");
const { users } = require("./seed-data/users");
const { categories } = require("./seed-data/categories");
const { events } = require("./seed-data/events");
const { orders } = require("./seed-data/orders");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Starting seed...");
    console.log("Deleting orders, events, categories and users...");
    await prisma.order.deleteMany();
    await prisma.event.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creating users, categories, events and orders...");
    await prisma.user.createMany({
      data: users,
    });
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.event.createMany({
      data: events,
    });
    await prisma.order.createMany({
      data: orders,
    });

    console.log("Seeding complete");
  } catch (error) {
    console.log("Error creating seed");
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
