import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../service/ApiService';

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

    console.log(nome)

  return (
    <div className='flex h-screen'>
        <div>
            <Sidebar />
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full h-1/6 flex flex-row justify-center items-center p-8'>
                <input type="text" placeholder='Filtrar por nome' onChange={(e) => setNome(e.target.value)} className='w-2/3 p-2 border border-gray-300 rounded bg-gray-100'/>
                <button className='w-1/3 h-full bg-030637 text-white p-2 rounded cursor-pointer m-6'> <a href="/novo_cliente">+ Adicionar cliente</a> </button>
            </div>
            <div className='w-full h-5/6 p-8'>
                <table className='w-full divide-y divide-gray-600 rounded-md border-rounded'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase tracking-wider'>cpf</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase tracking-wider'>nome</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase tracking-wider'>email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase tracking-wider'>telefone</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-grady-500 uppercase tracking-wider'>email</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {(nome=="" && dados!==null) && dados?.map(data => <tr>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{data.cpf}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{data.nome}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{data.email}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{data.telefone}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{data.endereco}</td>
                        </tr>)}
                        {nome!="" && <tr>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{dados.cpf}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{dados.nome}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{dados.email}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{dados.telefone}</td>
                            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-normal'>{dados.endereco}</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Clientes