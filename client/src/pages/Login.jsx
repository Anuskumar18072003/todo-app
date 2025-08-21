import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handles submit in login form
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      onLogin({ token: data.token, user: data.user });
      nav('/todos');
    } catch (err) {
      setError(err.message);
    }
  };

return (
    <div className="flex justify-center items-center mt-12">
      <div className="w-full max-w-lg bg-white p-10 rounded shadow">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <form onSubmit={submit} className="space-y-5">
          <input
            name="email"
            value={form.email}
            onChange={handle}
            placeholder="Email"
            type="email"
            className="w-full p-3 border rounded-lg"
          />
          <input
            name="password"
            value={form.password}
            onChange={handle}
            placeholder="Password"
            type="password"
            className="w-full p-3 border rounded-lg"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
