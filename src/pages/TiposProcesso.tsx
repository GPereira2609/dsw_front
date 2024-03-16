import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../service/ApiService';
import DataTable from 'react-data-table-component';

function TiposProcesso() {
  const [dados, setDados] = useState();
  const [nomeFiltro, setNomeFiltro] = useState("");

  const colunas = [
    {name: "Nome", selector: row => row.nome},
    {name: "Descrição", selector: row => row.descricao}
  ]

  useEffect(() => {
    if(nomeFiltro === "") {
      const response = api.get("/tipoProcesso")
        .then((res) => setDados(res.data))
        .catch((err) => console.log(err))
    } else {
      const response = api.get("/tipoProcesso/" + nomeFiltro)
        .then((res) => setDados(res.data))
        .catch((err) => console.log(err))
    }
  }, [nomeFiltro])

  return (
    <div className='h-screen flex'>
        <div>
            <Sidebar />
        </div>
        <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
            <div className='w-full h-1/6 flex flex-row justify-center items-center p-8'> 
                <input type='text' placeholder='Filtrar por tipo de processo' onChange={(e) => setNomeFiltro(e.target.value)} className='w-2/3 p-2 border border-gray-300 rounded bg-gray-100' />
                <button className='w-1/3 h-full bg-030637 text-white p-2 rounded cursor-pointer m-6'><a href="/novo_tipo_processo">+ Novo tipo de processo</a></button>
            </div>
            <div className='w-full h-5/6'>
              <DataTable columns={colunas} data={dados} pagination />
            </div>
        </div>
    </div>
  )
}

export default TiposProcesso