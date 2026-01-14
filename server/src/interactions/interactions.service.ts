import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InteractionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createInteractionDto: CreateInteractionDto) {
    const { clientId, projectId, ...rest } = createInteractionDto;

    // 1. Verify Client Ownership
    const client = await this.prisma.client.findFirst({
      where: { id: clientId, userId },
    });
    if (!client) throw new NotFoundException('Client not found');

    // 2. Verify Project Ownership (if provided)
    if (projectId) {
      const project = await this.prisma.project.findFirst({
        where: { id: projectId, userId },
      });
      if (!project) throw new NotFoundException('Project not found');
    }

    // 3. Create Interaction
    return this.prisma.interaction.create({
      data: {
        ...rest,
        clientId,
        projectId,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.interaction.findMany({
      where: { userId },
      include: { client: true, project: true },
      orderBy: { date: 'desc' },
    });
  }

  // Basic Delete/Update Logic (Optional for now, but good to have)
  async remove(userId: string, id: number) {
     // Implementation similar to clients/projects
     return `This action removes a #${id} interaction`;
  }
}