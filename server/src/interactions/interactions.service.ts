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

  async remove(userId: string, id: string) { 
    // 1. Verify it exists and belongs to user
    const interaction = await this.prisma.interaction.findFirst({
      where: { id, userId },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    // 2. Delete it
    return this.prisma.interaction.delete({
      where: { id },
    });
  }
}