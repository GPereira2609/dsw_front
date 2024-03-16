import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

function NovoProcesso() {
  const [cpfCliente, setCpfCliente] = useState();
  const [nomeCliente, setNomeCliente] = useState();

  return (
    <div className='h-screen flex'>
      <div><Sidebar /></div>
      <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
        <h1 className='text-3xl mb-4 text-black text-bold'>Novo processo</h1>
        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl mb-4 text-black text-bold'>Dados do Cliente</h1>
          <div className='flex flex-row justify-center items-center'>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                <label htmlFor='cpf' className="block text-sm font-bold text-gray-700">CPF do Cliente:</label>
                <input type='text' id="cpf" name="cpf" value={cpfCliente} placeholder='Digite o CPF do cliente' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e => setCpfCliente(e.target.value))} />
            </div>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                <label htmlFor='nome' className="block text-sm font-bold text-gray-700">Nome do Cliente:</label>
                <input type='text' id="nome" name="nome" value={nomeCliente} placeholder='Digite uma descrição para o tipo de processo' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e => setNomeCliente(e.target.value))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NovoProcesso