import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; email: string };
}

@UseGuards(AuthGuard('jwt'))
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() createDto: CreateReminderDto) {
    return this.remindersService.create(req.user.userId, createDto);
  }

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.remindersService.findAll(req.user.userId);
  }

  @Get('upcoming') // Specific route for dashboard
  findUpcoming(@Request() req: AuthenticatedRequest) {
    return this.remindersService.findUpcoming(req.user.userId);
  }

  @Patch(':id')
  update(@Request() req: AuthenticatedRequest, @Param('id') id: string, @Body() updateDto: UpdateReminderDto) {
    return this.remindersService.update(req.user.userId, id, updateDto);
  }
  
  @Delete(':id')
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.remindersService.remove(req.user.userId, id);
  }
}