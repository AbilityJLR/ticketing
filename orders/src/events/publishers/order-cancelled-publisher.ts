import { Subjects, Publisher, OrderCancelledEvent } from "@tmticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
