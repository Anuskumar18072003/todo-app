import { useState } from 'react';

export default function TodoForm({ token, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const authHeader = { Authorization: `Bearer ${token}` };

  // handle form submission
  const submit = async (e) => {
    e.preventDefault();
    try {
        
    // send POST request to create new todo
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create');
      setTitle('');
      setDescription('');
      onCreated(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4">
      <div className="flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="flex-1 p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" className="mt-3 w-full p-2 border rounded" />
    </form>
  );
}
