import { prisma } from "../../config/db";

const getDashboardStats = async () => {
  const [totalProjects, totalPosts, totalUsers, totalContacts] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.user.count(),
    prisma.contact.count(),
  ]);

  return {
    totalProjects,
    totalPosts,
    totalUsers,
    totalContacts,
  };
};

const getRecentActivities = async () => {
  const [recentProjects, recentPosts, recentContacts, recentUsers] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, createdAt: true },
    }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, createdAt: true },
    }),
    prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
  ]);

  // 🧠 Combine all activities and sort by date
  const recentActivities = [
    ...recentProjects.map((p) => ({ type: "Project", ...p })),
    ...recentPosts.map((p) => ({ type: "Post", ...p })),
    ...recentContacts.map((c) => ({ type: "Contact", ...c })),
    ...recentUsers.map((u) => ({ type: "User", ...u })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10); // show only top 10 recent

  return recentActivities;
};

export const StatsService = {
  getDashboardStats,
  getRecentActivities,
};
