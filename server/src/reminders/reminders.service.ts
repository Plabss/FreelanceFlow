import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto'; // Ensure this file exists/is generated
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemindersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReminderDto: CreateReminderDto) {
    const { clientId, projectId, ...rest } = createReminderDto;

    // Validate ownership if IDs are provided

    return this.prisma.reminder.create({
      data: {
        ...rest,
        clientId,
        projectId,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.reminder.findMany({
      where: { userId },
      orderBy: { dueDate: 'asc' }, // Soonest first
    });
  }

  // New: Find reminders specifically for the Dashboard (e.g., next 7 days)
  async findUpcoming(userId: string) {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return this.prisma.reminder.findMany({
      where: {
        userId,
        status: 'PENDING',
        dueDate: {
          gte: today,
          lte: nextWeek,
        },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  // Update Status (e.g., mark as completed)
  async update(userId: string, id: string, updateReminderDto: UpdateReminderDto) {
    const reminder = await this.prisma.reminder.findFirst({ where: { id, userId } });
    if (!reminder) throw new NotFoundException('Reminder not found');

    return this.prisma.reminder.update({
      where: { id },
      data: updateReminderDto,
    });
  }
  
  async remove(userId: string, id: string) {
     const reminder = await this.prisma.reminder.findFirst({ where: { id, userId } });
     if (!reminder) throw new NotFoundException('Reminder not found');
     return this.prisma.reminder.delete({ where: { id } });
  }
}