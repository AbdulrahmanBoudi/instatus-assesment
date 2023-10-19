import prisma from "../db/prisma";

function seedUsers() {
  prisma.user
    .create({
      data: { email: "tester@email.com", name: "tester", password: "test" },
    })
    .then(() => console.log("user seeded successfully"))
    .catch(() => console.log("failed to seed user"));
}
function seedActions() {
  prisma.action
    .create({ data: { name: "LOGGED_IN", object: "event_object" } })
    .then(() => console.log("action seeded successfully"))
    .catch(() => console.log("failed to seed action"));
}

function seed() {
  seedUsers();
  seedActions();
}

seed();
