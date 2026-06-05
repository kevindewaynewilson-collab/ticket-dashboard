import { useEffect, useState } from "react";
import "./index.css";

const sampleTickets = [
  {
    id: 1,
    title: "Laptop will not connect to Wi-Fi",
    category: "Network",
    priority: "High",
    status: "Open",
    description:
      "User cannot connect to the company Wi-Fi after a password change.",
  },
  {
    id: 2,
    title: "Printer not responding",
    category: "Hardware",
    priority: "Medium",
    status: "In Progress",
    description:
      "Office printer shows online, but print jobs stay stuck in the queue.",
  },
];

function App() {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("supportTickets");

    if (savedTickets) {
      return JSON.parse(savedTickets);
    }

    return sampleTickets;
  });

  const [form, setForm] = useState({
    title: "",
    category: "Hardware",
    priority: "Low",
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("supportTickets", JSON.stringify(tickets));
  }, [tickets]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Please enter a ticket title and description.");
      return;
    }

    const newTicket = {
      id: Date.now(),
      title: form.title,
      category: form.category,
      priority: form.priority,
      status: "Open",
      description: form.description,
    };

    setTickets([newTicket, ...tickets]);

    setForm({
      title: "",
      category: "Hardware",
      priority: "Low",
      description: "",
    });
  }

  function updateStatus(id, newStatus) {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === id) {
        return {
          ...ticket,
          status: newStatus,
        };
      }

      return ticket;
    });

    setTickets(updatedTickets);
  }

  function deleteTicket(id) {
    const filteredTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(filteredTickets);
  }

  function resetDemoData() {
    setTickets(sampleTickets);
  }

  const openTickets = tickets.filter((ticket) => ticket.status === "Open").length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <p className="text-blue-600 font-semibold mb-2">
            IT Support Workflow Tool
          </p>

          <h1 className="text-4xl font-bold mb-3">
            IT Support Ticket Dashboard
          </h1>

          <p className="text-slate-600 max-w-3xl">
            Create, track, update, and manage IT support tickets for common
            hardware, software, network, and access issues.
          </p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Open Tickets</p>
            <h2 className="text-3xl font-bold mt-2">{openTickets}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">In Progress</p>
            <h2 className="text-3xl font-bold mt-2">{inProgressTickets}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">Resolved</p>
            <h2 className="text-3xl font-bold mt-2">{resolvedTickets}</h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-sm">High Priority</p>
            <h2 className="text-3xl font-bold mt-2">{highPriorityTickets}</h2>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

            <label className="block mb-3">
              <span className="text-sm font-semibold">Ticket Title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 rounded mt-1 outline-none focus:border-blue-500"
                placeholder="Computer running slow"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-semibold">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 rounded mt-1 outline-none focus:border-blue-500"
              >
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Access</option>
                <option>Email</option>
                <option>Printer</option>
              </select>
            </label>

            <label className="block mb-3">
              <span className="text-sm font-semibold">Priority</span>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 rounded mt-1 outline-none focus:border-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-sm font-semibold">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-slate-300 p-2 rounded mt-1 outline-none focus:border-blue-500"
                rows="4"
                placeholder="Describe the issue..."
              />
            </label>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full font-semibold">
              Submit Ticket
            </button>

            <button
              type="button"
              onClick={resetDemoData}
              className="mt-3 border border-slate-300 hover:border-blue-500 text-slate-900 px-4 py-2 rounded-lg w-full font-semibold"
            >
              Reset Demo Data
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            {tickets.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center text-slate-500">
                No tickets created yet. Submit your first support request.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{ticket.title}</h3>

                      <p className="text-slate-600 mt-1">
                        {ticket.description}
                      </p>

                      <p className="text-sm text-slate-500 mt-2">
                        {ticket.category} | {ticket.priority} Priority
                      </p>
                    </div>

                    <span className="text-sm font-semibold bg-slate-100 px-3 py-1 rounded-full h-fit">
                      {ticket.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Open", "In Progress", "Resolved"].map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() => updateStatus(ticket.id, status)}
                        className="border border-slate-300 hover:border-blue-500 px-3 py-1 rounded text-sm"
                      >
                        {status}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => deleteTicket(ticket.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;