import { IsNotEmpty, IsString, IsOptional, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { ReminderStatus } from '@prisma/client';

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(ReminderStatus)
  @IsOptional()
  status?: ReminderStatus;

  @IsUUID()
  @IsOptional()
  clientId?: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;
}