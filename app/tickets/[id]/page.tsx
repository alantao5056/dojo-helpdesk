import { notFound } from "next/navigation";
import DeleteTicketButton from "../DeleteTicketButton";

export async function generateStaticParams() : Promise<{ id: string }[]> {
  // [{id: '1'}, {id: '2'}, ...]
  const res = await fetch('http://localhost:4000/tickets')
  const tickets = await res.json();

  return tickets.map((ticket: { id: string }) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: string) {
  const res = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 60,
    }
  })

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
        <DeleteTicketButton ticketId={id} />
      </div>
    </main>
  )
}
