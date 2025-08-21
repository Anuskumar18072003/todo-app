import { Link } from 'react-router-dom';

export default function Navbar({ user, logout }) {
  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-10">
      <div className="px-6 py-3 flex justify-between items-center">

        {/* ToDoApp Logo */}
        <Link to="/" className="font-bold text-xl">TodoApp</Link>

       {/* Links  */}
        <div className="space-x-4">
          {!user && <Link to="/login" className="text-sm font-medium">Login</Link>}
          {!user && <Link to="/register" className="text-sm font-medium">Register</Link>}
          {user && (
            <>
              <span className="text-sm mr-2">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
