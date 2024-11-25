import { Friend, PrismaClient } from '@prisma/client';

export const dbClient = new PrismaClient();

export const createFriend = async (friend: Friend): Promise<Friend> => {
  const newFriend = await dbClient.friend.create({ data: friend });

  return newFriend;
};

export const getFriends = async (): Promise<Friend[]> => {
  const users = await dbClient.friend.findMany();

  return users;
};
