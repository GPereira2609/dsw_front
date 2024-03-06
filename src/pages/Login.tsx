import { useState } from 'react';
import api from '../service/ApiService';
import { getToken, isAuthenticated, login } from '../service/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const refreshPage = () => {
    setUsername("");
    setPassword("");
    navigate(0);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username && !password) {
      toast.warning("Preencha os campos de usuário e senha")
    } else if (!username && password) {
      toast.warning("Preencha o campo de usuário")
    } else if (username && !password) {
      toast.warning("Preencha o campo de senha")
    } else {
      api.post("/auth/login", { login: username, password: password })
        .then((res) => {
          if (res.status === 200) {
            login(res.data["token"]);
            refreshPage();
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 404") {
            toast.error("Usuário inexistente")
          } else if (err.message === "Request failed with status code 403") {
            toast.error("Senha incorreta")
          }
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-3C0753">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-black text-bold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold text-gray-700">Username:</label>
            <input type="text" id="username" name="username" placeholder="Digite seu usuário" className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password:</label>
            <input type="password" id="password" name="password" placeholder="Digite sua senha" className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" onClick={handleLogin} className="w-full bg-030637 text-white p-2 rounded cursor-pointer">Entrar</button>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
}

export default Login;
