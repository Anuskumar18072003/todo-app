import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handles submit in register form
  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      // redirect to login page after successful registration
      nav('/login'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="w-full max-w-lg bg-white p-10 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Register</h1>
        {error && <div className="text-red-700 mb-4 text-center">{error}</div>}
        <form onSubmit={submit} className="space-y-6">
          <input
            name="username"
            value={form.username}
            onChange={handle}
            placeholder="Username"
            className="w-full p-3 border rounded-lg"
          />
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
              className="bg-blue-600 text-white px-8 py-4 rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
