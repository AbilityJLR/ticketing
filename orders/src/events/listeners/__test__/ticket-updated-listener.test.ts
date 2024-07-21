import { TicketUpdateListener } from "../ticket-updated-listener"
import { Message } from "node-nats-streaming"
import { TicketUpdatedEvent } from "@tmticket/common"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket"
import mongoose from "mongoose"

const setup = async () => {
  const listener = new TicketUpdateListener(natsWrapper.client)
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })

  await ticket.save()

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'asdfasdf'
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { msg, data, ticket, listener }
}

it('finds, updates, and save a ticket', async () => {
  const { msg, data, ticket, listener } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)
  expect(updatedTicket!.version).toEqual(data.version)
})

it('acks the message', async () => {
  const { msg, data, ticket, listener } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toBeCalled()
})

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener, ticket } = await setup()

  data.version = 10

  try {
    await listener.onMessage(data, msg)
  } catch (err) { }

  expect(msg.ack).not.toHaveBeenCalled()
})
