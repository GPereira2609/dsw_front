import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { toast, ToastContainer } from 'react-toastify'
import api from '../service/ApiService';
import { useNavigate, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../service/AuthService';

interface TipoProcessoForm {
    nome: string,
    descricao: string | null
}

function NovoTipoProcesso() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const navigate = useNavigate();
    const [role, setRole] = useState();
    const user = jwtDecode(getToken())["sub"];

  useEffect(() => {
    const response = api.get("/auth/user_details/" + user)
      .then((res) => {
        setRole(res.data["role"]);
      })
      .catch((err) => console.log(err))
  }, [])

    const handleSave = (e) => {
        e.preventDefault();

        if(!nome) {
            toast.warning("Nome não pode ser vazio")
        } else {
            salvarTipoProcesso();
        }
    }

    const salvarTipoProcesso = () => {
        let tipoProcesso: TipoProcessoForm = {
            "nome": nome,
            "descricao": null
        }

        if(descricao) tipoProcesso["descricao"] = descricao

        const response = api.post("/tipoProcesso", tipoProcesso)
            .then((res) => limparForm())
            .catch((err) => toast.error("Nome já foi cadastrado"))
    }

    const limparForm = () => {
        setNome("");
        setDescricao("");

        toast.success("Tipo de processo cadastrado com sucesso");
        
        setTimeout(redirect, 3000);
    }

    const redirect = () => {
        navigate("/tipos_processo");
    }

  return (
    <div className='h-screen flex'>
        <div>
            <Sidebar />
        </div>
        <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
            <h1 className='text-2xl mb-4 text-black text-bold'>Novo tipo de processo</h1>
            <form onSubmit={handleSave}>
                <div className='flex flex-row justify-center items-center'>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='nome' className="block text-sm font-bold text-gray-700">Nome:</label>
                        <input type='text' id="nome" name="nome" value={nome} placeholder='Digite o nome do tipo de processo' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e => setNome(e.target.value))} />
                    </div>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='descricao' className="block text-sm font-bold text-gray-700">Descrição:</label>
                        <input type='text' id="descricao" name="descricao" value={descricao} placeholder='Digite uma descrição para o tipo de processo' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e => setDescricao(e.target.value))} />
                    </div>
                </div>
                <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                    <button type="submit" className="w-80 bg-030637 text-white p-2 rounded cursor-pointer">+ Salvar tipo de processo</button>
                </div>
            </form>
        </div>
        <ToastContainer autoClose={3000} />
    </div>
  )
}

export default NovoTipoProcesso