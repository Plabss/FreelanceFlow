import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; email: string };
}

@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Request() req: AuthenticatedRequest, @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(req.user.userId, createProjectDto);
  }

  @Get()
  findAll(@Request() req: AuthenticatedRequest) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.projectsService.findOne(+id); }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) { return this.projectsService.update(+id, updateProjectDto); }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.projectsService.remove(+id); }
}