import { Subjects, Publisher, PaymentCreatedEvent } from "@tmticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}

