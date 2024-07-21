import { Subjects, Publisher, ExpirationCompleteEvent } from "@tmticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
