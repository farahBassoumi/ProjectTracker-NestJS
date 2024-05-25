import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('progress')
export class Progress {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'id' })
  project: Project;
}
