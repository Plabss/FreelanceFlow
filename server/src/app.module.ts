import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ClientsModule, ProjectsModule, InteractionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
