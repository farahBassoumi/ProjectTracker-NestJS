import { Exclude, instanceToPlain } from 'class-transformer';
import { Member } from 'src/teams/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string;

  @OneToMany(() => Member, (member) => member.user)
  members: Member[];

  @CreateDateColumn()
  createdAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
