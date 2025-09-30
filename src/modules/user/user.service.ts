import { prisma } from "../../config/db";
import { Prisma, User } from "@prisma/client"
import bcrypt from "bcrypt";
import { envVars } from "../../config/env";

const createUser = async ( payload: Prisma.UserCreateInput ): Promise<User> => {
    const existingOwner = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingOwner) {
        throw new Error("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return user;
};


const getAllFromDB = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            posts: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return {data:result};
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            posts: true
        }
    })
    return result;
}

const updateUser = async (id: number, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}

export const UserService = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}