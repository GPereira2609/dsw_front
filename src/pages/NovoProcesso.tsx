import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import api from '../service/ApiService';
import 'react-dropdown/style.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../service/AuthService';

interface Processo {
  dataInicio: string | null,
  cliente: string,
  tipoprocesso: string,
  dataFim: string | null,
  status: string | null
}

function NovoProcesso() {
  const [cpfList, setCpfList] = useState();
  const [tipoProcessoList, setTipoProcessoList] = useState();

  const [selectedOption, setSelectedOption] = useState();
  const [tipoProcessoSelectedOption, setTipoProcessoSelectedOption] = useState();

  const [nomeCliente, setNomeCliente] = useState();
  const [descricaoTipoProcesso, setDescricaoTipoProcesso] = useState();

  const [dataInicio, setDataInicio] = useState(new Date("01/01/2000"));
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("");

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


  useEffect(()=>{
    const response = api.get("/clientes/cpf")
      .then((res)=>{
        const valores = Object.values(res.data);
        const cpfs = valores.map(item=>item.cpf)
        setCpfList(cpfs);
      })
      .catch((err)=>console.log(err))
  }, [])

  useEffect(() => {
    if(selectedOption==="") setNomeCliente("")
    else {
    const response = api.get("/clientes/cpf/" + selectedOption)
      .then((res) => setNomeCliente(res.data[0]["nome"]))
      .catch((err) => console.log(err))
    }
  }, [selectedOption])

  useEffect(()=>{
    const response = api.get("/tipoProcesso")
      .then((res) => {
        const valores = Object.values(res.data);
        const tipoProcesso = valores.map(item=>item.nome);
        setTipoProcessoList(tipoProcesso);
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(()=>{
    if(tipoProcessoSelectedOption==="") setDescricaoTipoProcesso("")
    else {
      const response = api.get("/tipoProcesso/" + tipoProcessoSelectedOption)
        .then((res) => setDescricaoTipoProcesso(res.data[0]["descricao"]))
        .catch((err) => console.log(err))
    }
  }, [tipoProcessoSelectedOption])

  const handleSave = () => {
    try {
      salvarProcesso();
    } catch(err) {
      toast.error("Não foi possível salvar o processo")
    }
  }

  const formatarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (_, p1, p2, p3, p4) => `${p1}.${'*'.repeat(3)}.${'*'.repeat(3)}-${p4}`);  
  } 

  console.log(dataInicio)
  console.log(dataFim)
  console.log(status)

  const salvarProcesso = () => {
    let processo: Processo = {
      "cliente": selectedOption,
      "tipoprocesso": tipoProcessoSelectedOption,
      "dataInicio": null,
      "dataFim": null,
      "status": null
    }
    console.log(processo)

    if(dataInicio) processo["dataInicio"] = dataInicio;
    if(dataFim) processo["dataFim"] = dataFim;
    if(status) processo["status"] = status;

    const response = api.post("/processos", processo)
      .then((res) => {
        limparPagina();
        toast.success("Processo salvo");
        setTimeout(redirect, 3000);
      })
      .catch((err) => toast.warning("CPF do cliente, nome do cliente e data inicial são parâmetros obrigatórios"))
  }

  const redirect = () => {
    navigate("/processos")
  }

  const limparPagina = () => {
    setSelectedOption("");
    setTipoProcessoSelectedOption("");
    setDataInicio("");
    setDataFim("");
    setStatus("");
  }

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
                <select value={selectedOption} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setSelectedOption(e.target.value)}>
                  <option value="">Selecione um CPF</option>
                  {cpfList?.map(cpf => (
                    <option value={cpf}>{formatarCPF(cpf)}</option>
                  ))}
                </select>
            </div>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                <label htmlFor='nome' className="block text-sm font-bold text-gray-700">Nome do Cliente:</label>
                <input type='text' id="nome" name="nome" value={nomeCliente} placeholder='' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e => setNomeCliente(e.target.value))} />
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl mb-4 text-black text-bold'>Dados do Tipo de Processo</h1>
          <div className='flex flex-row justify-center items-center'>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
              <label htmlFor='tipoProcesso' className='block text-sm font-bold text-gray-700'>Tipo de Processo:</label>
              <select value={tipoProcessoSelectedOption} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setTipoProcessoSelectedOption(e.target.value)}>
                <option value="">Selecione um tipo de processo</option>
                {tipoProcessoList?.map(nome => (
                  <option value={nome}>{nome}</option>
                ))}
              </select>
            </div>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
              <label htmlFor='descTipoProcesso' className='block text-sm font-bold text-gray-700'>Descrição do tipo de processo:</label>
              <input type='text' id="descricao" name="descricao" value={descricaoTipoProcesso} placeholder='' className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setDescricaoTipoProcesso(e.target.value)}></input>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-2xl mb-4 text-black text-bold'>Dados do Processo</h1>
          <div className='flex flex-row justify-center items-center'>
            <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
              <label htmlFor='data_inicio' className='block text-sm font-bold text-gray-700'>Data de início do processo:</label>
              <DatePicker selected={dataInicio} onChange={(date) => setDataInicio(date)} className="w-full p-2 border border-gray-300 rounded bg-gray-100 mb-5" />
              <label htmlFor='status' className='block text-sm font-bold text-gray-700'>Status do processo:</label>
              <select value={status} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setStatus(e.target.value)}>
                <option value="">Selecione uma opção</option>
                <option value="iniciado">Iniciado</option>
                <option value="em andamento">Em andamento</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
            <div className='w-80 h-full flex flex-col justify-center items-center margin-6'>
              <label htmlFor='data_fim' className='block text-sm font-bold text-gray-700'>Data de fim do processo:</label>
              <DatePicker selected={dataFim} onChange={(date) => setDataFim(date)} className="w-full p-2 border border-gray-300 rounded bg-gray-100 mb-10" />
              <button onClick={handleSave} className='w-80 bg-030637 text-white p-2 rounded cursor-pointer'>+ Salvar processo</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default NovoProcesso