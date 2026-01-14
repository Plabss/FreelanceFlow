import { IsEnum, IsNotEmpty, IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { InteractionType } from '@prisma/client';

export class CreateInteractionDto {
  @IsEnum(InteractionType)
  @IsNotEmpty()
  type: InteractionType;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsUUID()
  @IsOptional()
  projectId?: string;
}