export default function TodoItem({ todo, token, onUpdated, onDeleted }) {
  const authHeader = { Authorization: `Bearer ${token}` };

  // function to change status of todo
  const toggle = async () => {
    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ status: todo.status === 'pending' ? 'completed' : 'pending' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      onUpdated(data);
    } catch (err) { console.error(err); }
  };

  // function to delete todo
  const remove = async () => {
    if (!window.confirm('Delete this todo?')) return;
    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: 'DELETE',
        headers: { ...authHeader }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      onDeleted(todo._id);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
      <div>
        <h3 className={`text-lg font-medium ${todo.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </h3>
        {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}

        <span
          className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full 
            ${todo.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
        >
          {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="px-3 py-1 border rounded text-sm"
        >
          {todo.status === 'pending' ? 'Complete' : 'Undo'}
        </button>
        <button
          onClick={remove}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
