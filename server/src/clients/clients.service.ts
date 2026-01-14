import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  // 1. Create Client (linked to User)
  async create(userId: string, createClientDto: CreateClientDto) {
    return await this.prisma.client.create({
      data: {
        ...createClientDto,
        userId,
      },
    });
  }

  // 2. Find All Clients (ONLY for this User)
  async findAll(userId: string) {
    return await this.prisma.client.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, 
    });
  }

  // 3. Find One (Secure)
  async findOne(userId: string, clientId: string) {
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!client) {
      throw new NotFoundException(`Client not found`);
    }

    return client;
  }

  // 4. Update
  async update(userId: string, clientId: string, updateClientDto: UpdateClientDto) {
    // Check if exists/owned first
    await this.findOne(userId, clientId); 

    return this.prisma.client.update({
      where: { id: clientId },
      data: updateClientDto,
    });
  }

  // 5. Delete
  async remove(userId: string, clientId: string) {
    // Check if exists/owned first
    await this.findOne(userId, clientId);

    return this.prisma.client.delete({
      where: { id: clientId },
    });
  }
}