"use client"

import { useRouter } from "next/navigation";

export default function CreateTicketButton() {
  const router = useRouter();
  return (
    <button className="btn-primary mt-7" onClick={() => router.push('/tickets/create')}>Create New Ticket</button>
  )
}
