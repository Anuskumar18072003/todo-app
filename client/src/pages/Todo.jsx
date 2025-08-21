import { useEffect, useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

export default function Todos({ token }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const authHeader = { Authorization: `Bearer ${token}` };

  // load todo from server
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos', { headers: authHeader });
      const data = await res.json();
      setTodos(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* creating, updating and deleting todo by id */
  const handleCreated = (newTodo) => setTodos((s) => [newTodo, ...s]);
  const handleUpdated = (updated) => setTodos((s) => s.map((t) => (t._id === updated._id ? updated : t)));
  const handleDeleted = (id) => setTodos((s) => s.filter((t) => t._id !== id));

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-3">Your Todos</h2>
      <TodoForm token={token} onCreated={handleCreated} />
      {loading ? <div>Loading...</div> : (
        todos.length === 0 ? <div className="bg-white p-4 rounded shadow">No todos yet</div> :
          todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} token={token} onUpdated={handleUpdated} onDeleted={handleDeleted} />
          ))
      )}
    </div>
  );
}
