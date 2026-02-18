"use client"
// client component

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('low');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title, body, priority, user_email: 'mario@netninja.dev'
    };

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticket)
    });

    if (res.status == 201) {
      router.refresh();
      router.push('/tickets');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Title: </span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body: </span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority: </span>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <button
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}
