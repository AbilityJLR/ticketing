import { Publisher, Subjects, TicketUpdatedEvent } from '@tmticket/common'
import { natsWrapper } from '../../nats-wrapper'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
