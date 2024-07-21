import { Publisher, Subjects, TicketCreatedEvent } from '@tmticket/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
