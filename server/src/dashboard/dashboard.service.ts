import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: string) {
    // Run all queries in parallel for performance
    const [totalClients, totalProjects, projectsByStatus, upcomingReminders] = await Promise.all([
      // 1. Total Clients
      this.prisma.client.count({ where: { userId } }),
      
      // 2. Total Projects
      this.prisma.project.count({ where: { userId } }),
      
      // 3. Projects grouped by Status
      this.prisma.project.groupBy({
        by: ['status'],
        where: { userId },
        _count: { status: true },
      }),

      // 4. Reminders due soon (next 7 days)
      this.prisma.reminder.findMany({
        where: {
            userId,
            status: 'PENDING',
            dueDate: {
                gte: new Date(),
                lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        },
        take: 5, // Limit to 5
        orderBy: { dueDate: 'asc' }
      })
    ]);

    return {
      totalClients,
      totalProjects,
      projectsByStatus, // Returns array like [{ status: 'PENDING', _count: { status: 3 } }]
      upcomingReminders,
    };
  }
}