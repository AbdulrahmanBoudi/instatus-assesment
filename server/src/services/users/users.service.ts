import prisma from "../../../db/prisma";

//User service
async function getUserDetailsByEmail(user_email: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { email: user_email },
      select: { name: true, id: true },
    });

    return user;
  } catch (e) {
    return null;
  }
}
async function createUser(user_email: string, user_name: string) {
  const user = await prisma.user.create({
    data: { name: user_name, email: user_email, password: "mock" },
    select: { name: true, id: true },
  });
  return user;
}
async function updateUser(user_name: string, user_id: string) {
  const user = await prisma.user.update({
    where: { id: user_id },
    data: { name: user_name },
  });
  return user;
}

export const usersService = { getUserDetailsByEmail, createUser, updateUser };
