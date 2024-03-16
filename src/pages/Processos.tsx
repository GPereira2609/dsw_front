import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../service/ApiService';
import DataTable from 'react-data-table-component';

function Processos() {
  const [filtro, setFiltro] = useState();
  const [dados, setDados] = useState();

  const colunas = [
    {name: "Cliente", selector: row => row.cliente},
    {name: "Tipo de processo", selector: row => row.tipoprocesso},
    {name: "Status", selector: row => row.status},
    {name: "Data de início", selector: row => row.dataInicio},
    {name: "Data de fim", selector: row => row.dataFim}
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