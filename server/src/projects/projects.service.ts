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

  // 3. Find One (Secure)
  async findOne(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        userId: userId, // Ownership check
      },
      include: { client: true },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // 4. Update
  async update(userId: string, projectId: string, updateProjectDto: UpdateProjectDto) {
    // Check existence/ownership first
    await this.findOne(userId, projectId);

    return this.prisma.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
  }

  // 5. Remove
  async remove(userId: string, projectId: string) {
    // Check existence/ownership first
    await this.findOne(userId, projectId);

    return this.prisma.project.delete({
      where: { id: projectId },
    });
  }
}