  import { Exclude, instanceToPlain } from 'class-transformer';
  import {
    Column,
    CreateDateColumn,
    Entity,
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

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    toJSON() {
      return instanceToPlain(this);
    }
  }
