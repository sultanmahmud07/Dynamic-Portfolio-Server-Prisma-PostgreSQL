import { Post, Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {

    const userExists = await prisma.user.findUnique({
        where: { id: (payload as any).authorId },
    });

    if (!userExists) {
        throw new Error("Author not found — please provide a valid user ID");
    }

    const result = await prisma.project.create({
        data: payload,
        include: {
            author: { select: { id: true, name: true, email: true } },
        },
    });

    return result;
};


const getAllProjects = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.project.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getProjectById = async (id: number) => {
    return await prisma.$transaction(async (tx) => {
        await tx.project.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        });

        return await tx.project.findUnique({
            where: { id },
            include: { author: true },
        });
    })
};

export const updateProject = async (id: number, payload: Partial<Project> & { deleteImages?: string[] }) => {
  // 1️⃣ Check if the project exists
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found.");
  }

  let updatedImages: string[] = existingProject.images || [];

  // 2️⃣ Handle new images (append to existing)
  if (payload.images && payload.images.length > 0) {
    updatedImages = [...updatedImages, ...payload.images];
  }

  // 3️⃣ Handle image deletions
  if (payload.deleteImages && payload.deleteImages.length > 0) {
    // Filter out deleted images
    updatedImages = updatedImages.filter(
      (imageUrl) => !payload.deleteImages?.includes(imageUrl)
    );

    // Delete removed images from Cloudinary
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCLoudinary(url))
    );
  }

  // 4️⃣ If thumbnail is replaced, delete the old one
  if (payload.thumbnail && existingProject.thumbnail) {
    await deleteImageFromCLoudinary(existingProject.thumbnail);
  }

  // 5️⃣ Update the project
  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      ...payload,
      images: updatedImages,
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  });

  return updatedProject;
};



const deleteProject = async (id: number) => {
    const existingProject = await prisma.project.findUnique({
        where: { id },
    });
    if (!existingProject) {
        throw new Error("Project not found.");
    }
    if (existingProject.thumbnail) {
        await deleteImageFromCLoudinary(existingProject.thumbnail)
    }
    if (existingProject.images && Array.isArray(existingProject.images) && existingProject.images.length) {
        const imageUrls = existingProject.images.map(file => file);
        await Promise.all(imageUrls.map(url => deleteImageFromCLoudinary(url)))
    }
    const deletedProject = await prisma.project.delete({ where: { id } });
    return deletedProject;
};


const getProjectStat = async () => {
   
}

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStat
}