import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  owner: User;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  creationDate: Date;
}
