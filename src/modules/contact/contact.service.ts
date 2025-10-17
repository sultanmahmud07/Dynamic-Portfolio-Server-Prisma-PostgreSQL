import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../config/db";
import { Contact, Prisma } from "@prisma/client";

// 🟢 Create a new contact
const createContact = async (data: Prisma.ContactCreateInput):Promise<Contact> => {
  const contact = await prisma.contact.create({ data });
  return contact;
};

const getContact = async (query: Record<string, string>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchTerm = query.search || "";

  const where: Prisma.ContactWhereInput = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { phone: { contains: searchTerm, mode: "insensitive" } },
        ],
      }
    : {};

  // const orderBy =
  //   query.sortBy && query.sortOrder
  //     ? { [query.sortBy]: query.sortOrder }
  //     : { createdAt: "desc" };

  const [data, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy:  { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.contact.count({ where }),
  ]);

  const meta = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  return { data, meta };
};

// 🟢 Delete contact by ID
const deleteContact = async (contactId: string) => {
  const existing = await prisma.contact.findUnique({
    where: { id: Number(contactId) },
  });

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact info not found");
  }

  await prisma.contact.delete({
    where: { id: Number(contactId) },
  });

  return { data: contactId };
};

export const ContactService = {
  createContact,
  getContact,
  deleteContact,
};
