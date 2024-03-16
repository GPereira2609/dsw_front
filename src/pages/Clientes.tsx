import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../service/ApiService';
import DataTable from 'react-data-table-component';

function Clientes() {
    const [dados, setDados] = useState();
    const [nome, setNome] = useState("");

    useEffect(() => {
        if(nome==="") {
            const response = api.get("/clientes").then(
                (res) => setDados(res.data)
            ).catch(
                (err) => console.log(err)
            )
        } else {
            const response = api.get("/clientes/nome/"+nome).then(
                (res) => setDados(res.data)
            ).catch(
                (err) => console.log(err)
            )
        }
    }, [nome])

    console.log(dados)

    const colunas = [
        {name: "CPF", selector: row => row.cpf},
        {name: "Nome", selector: row => row.nome},
        {name: "Email", selector: row => row.email},
        {name: "Telefone", selector: row => row.telefone},
        {name: "Endereço", selector: row => row.endereco}
    ]

  return (
    <div className='flex h-screen'>
        <div>
            <Sidebar />
        </div>
        <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
            <div className='w-full h-1/6 flex flex-row justify-center items-center p-8'>
                <input type="text" placeholder='Filtrar por nome' onChange={(e) => setNome(e.target.value)} className='w-2/3 p-2 border border-gray-300 rounded bg-gray-100'/>
                <button className='w-1/3 h-full bg-030637 text-white p-2 rounded cursor-pointer m-6'><a href="/novo_cliente">+ Adicionar cliente</a></button>
            </div>
            <div className='w-full h-5/6'>
                <DataTable columns={colunas} data={dados} pagination />
            </div>
        </div>
    </div>
  )
}

export default Clientes