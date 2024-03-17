import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../service/ApiService';
import DataTable from 'react-data-table-component';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../service/AuthService';

function Processos() {
  const [filtro, setFiltro] = useState();
  const [dados, setDados] = useState();

  const [role, setRole] = useState();
  const user = jwtDecode(getToken())["sub"];

  useEffect(() => {
    const response = api.get("/auth/user_details/" + user)
      .then((res) => {
        setRole(res.data["role"]);
      })
      .catch((err) => console.log(err))
  }, [])

  const formatarData = (date: string) => {
    const data = new Date(date);
    const dia = (data.getDate() + 1).toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  const formatarStatus = (status: string) => {
    status = status.replace("_", " ");
    status = status.toLowerCase();

    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  const formatarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, p1, p2, p3, p4) => `${p1}.${'*'.repeat(3)}.${'*'.repeat(3)}-${p4}`);  
  } 


  const colunas = [
    {name: "Cliente", selector: row => formatarCPF(row.cliente)},
    {name: "Tipo de processo", selector: row => row.tipoprocesso},
    {name: "Status", selector: row => formatarStatus(row.status)},
    {name: "Data de início", selector: row => formatarData(row.dataInicio)},
    {name: "Data de fim", selector: row => formatarData(row.dataFim)}
  ]

  useEffect(() => {
    if(!filtro) {
      const response = api.get("/processos")
        .then((res) => setDados(res.data))
        .catch((err) => console.log(err))
    } else {
      const response = api.get("/processos/" + filtro)
        .then((res) => setDados(res.data))
        .catch((err) => console.log(err))
    }
  }, [filtro])

  return (
    <div className='h-screen flex'>
      <div><Sidebar /></div>
      <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
        <div className='w-full h-1/6 flex flex-row justify-center items-center p-8'>
          <input type="text" placeholder='Filtrar por CPF do cliente' onChange={(e) => setFiltro(e.target.value)} className='w-2/3 p-2 border border-gray-300 rounded bg-gray-100'/>
          <button className='w-1/3 h-full bg-030637 text-white p-2 rounded cursor-pointer m-6'><a href="/novo_processo">+ Adicionar processo</a></button>
        </div>
        <div className='w-full h-5/6'>
          <DataTable columns={colunas} data={dados} pagination />
        </div>
      </div>
    </div>
  )
}

export default Processos