import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @IsOptional()
  budget?: number;

  @IsDateString() // Validates YYYY-MM-DD format
  @IsOptional()
  deadline?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}