import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; email: string };
}

@UseGuards(AuthGuard('jwt'))
@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionsService.create(req.user.userId, createInteractionDto);
  }

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.interactionsService.findAll(req.user.userId);
  }
}