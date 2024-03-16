import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import logo from '../assets/logo1.png';
import logut from '../assets/logout.png';
import api from "../service/ApiService";
import { getToken, logout } from "../service/AuthService";
import { jwtDecode } from "jwt-decode";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext()

interface UserDetails {
  id: string,
  login: string,
  nome: string, 
  email: string,
  password: string,
  role: string,
  enable: boolean,
  authorities: Array<{}>
  username: string,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  accountNonExpired: boolean
}

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const user = jwtDecode(getToken())["sub"];
  const navigate = useNavigate();

  useEffect(() => {
    const response = api.get("/auth/user_details/" + user)
      .then((res) => {
        setName(res.data["nome"]);
        setEmail(res.data["email"]);
        setRole(res.data["role"]);
      })
      .catch((err) => console.log(err))
  }, [])

  const handleLogout = () => {
    logout();
    navigate(0);
  }
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-3C0753 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="p-4 pb-2 flex flex-col justify-center items-center">
          <ul>
            <li>
              <a href="/clientes" className="text-white text-bold">Clientes</a>
            </li>
            {(role==="ESTAGIARIO" || role==="ADVOGADO") && (
              <li>
                <a href="/tipos_processo" className="text-white text-bold">Tipos de Processo</a>
              </li>
            )}
            {role==="ADVOGADO" && (
              <li>
                <a href="/processos" className="text-white text-bold">Processos</a>
              </li>
            )}
          </ul>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
        
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">{name}</h4>
              <span className="text-xs text-gray-600 text-white">{email}</span>
            </div>
            {<button onClick={handleLogout}><img src={logut} alt=""/></button>}
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}