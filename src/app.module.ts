import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ProjectsModule } from "./projects/projects.module";
import { TeamsModule } from "./teams/teams.module";
import { TasksModule } from "./tasks/tasks.module";
import { ProgressModule } from "./progress/progress.module";
import { InvitationsModule } from './invitations/invitations.module';
import { EventsModule } from './events/events.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Farah",
      database: "postgres",
      entities: [
         __dirname + '/**/*.entity{.ts,.js}'
      ],
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    TeamsModule,
    TasksModule,
    ProgressModule,
    InvitationsModule,
    EventsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
