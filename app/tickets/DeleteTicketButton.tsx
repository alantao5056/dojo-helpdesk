"use client"

import { usePathname, useRouter } from "next/navigation";

export default function DeleteTicketButton({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleClick() {
    const res = await fetch(`http://localhost:4000/tickets/${ticketId}`, {
      method: "DELETE",
    });
    console.log(res);
    if (res.ok) {
      if (pathname === "/tickets") {
        router.refresh();
      } else {
        router.push("/tickets");
      }
    }
  }

  return (
    <button className="btn-secondary" onClick={handleClick}>Delete Ticket</button>
  )
}
