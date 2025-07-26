import { useEffect, useState } from "react";
import Profiles from "./Profiles.jsx";

function Account() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.electronAPI.getCurrentUser().then((loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
      }
    });
  }, []);

  const handleLogin = async () => {
    const res = await window.electronAPI.login(email, password);
    if (res.success) {
      setUser(res.user);
    } else {
      alert("Login failed");
    }
  };

  const handleSignUp = async () => {
    const res = await window.electronAPI.signup(email, password);
    if (res.success) {
      setUser(res.user);
    } else {
      alert("Signup failed");
    }
  };

  const handleLogout = async () => {
    await window.electronAPI.logout();
    setUser(null);
    setEmail("");
    setPassword("");
    setMode("login");
  };

  const handleClose = () => {
    window.close();
  };

  if (user) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-xl space-y-6 text-center">
        <h2 className="text-xl font-semibold">Hello, {user.email}</h2>
        <Profiles userId={user.user_id} />
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "login" ? (
          <>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition"
            >
              Login
            </button>
            <p className="text-sm text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-500 hover:underline"
              >
                Sign Up Here
              </button>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={handleSignUp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </>
        )}

        <button
          onClick={handleClose}
          className="w-full text-gray-500 hover:text-gray-700 transition mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Account;
