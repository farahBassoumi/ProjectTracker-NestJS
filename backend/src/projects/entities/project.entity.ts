import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Team, (team) => team.project, { cascade: ['insert'] })
  team: Team;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToOne(() => Progress, (progress) => progress.project, {
    cascade: ['insert'],
  })
  progress: Progress;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
