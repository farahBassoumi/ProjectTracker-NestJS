import { InvitationStatus } from '../enum/invitation-status.enum';
import { Matches } from 'class-validator';

export class UpdateInvitationDto {
  @Matches(
    `^${Object.values(InvitationStatus)
      .filter((value) => value != InvitationStatus.Pending)
      .join('|')}$`,
    '',
    {
      message: `The role must be either ${InvitationStatus.Accepted} or ${InvitationStatus.Dismissed}.`,
    },
  )
  status: InvitationStatus;
}
