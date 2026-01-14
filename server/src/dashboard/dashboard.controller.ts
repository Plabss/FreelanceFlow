import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; email: string };
}

@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getStats(@Request() req: AuthenticatedRequest) {
    return this.dashboardService.getStats(req.user.userId);
  }
}