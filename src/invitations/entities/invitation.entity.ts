import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Team } from "../../teams/entities/team.entity";

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  reciever: User;

  @ManyToOne(() => Team)
  team: Team; // not sure whether the invi should be sent to join a team or a project
}
