import { Suspense } from "react";
import Loading from "../loading";
import TicketList from "./TicketList";
import CreateTicketButton from "./CreateTicketButton";

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
          <CreateTicketButton />
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  )
}
