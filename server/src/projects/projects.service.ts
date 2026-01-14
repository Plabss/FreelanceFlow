import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const { clientId, ...rest } = createProjectDto;

    // 1. Validate Client Ownership
    // Check if the client exists and belongs to THIS user
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found or access denied');
    }

    // 2. Create Project
    return this.prisma.project.create({
      data: {
        ...rest,
        clientId,
        userId,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: { client: true }, // Include client details in the response
      orderBy: { createdAt: 'desc' },
    });
  }

  // Placeholders
  findOne(id: number) { return `This action returns a #${id} project`; }
  update(id: number, updateProjectDto: UpdateProjectDto) { return `This action updates a #${id} project`; }
  remove(id: number) { return `This action removes a #${id} project`; }
}