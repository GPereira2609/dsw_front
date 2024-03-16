import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../service/ApiService';
import { useNavigate } from 'react-router-dom';

interface FormCliente {
    cpf: string,
    nome: string,
    email: string | null,
    telefone: string | null,
    endereco: string | null
}

function NovoCliente() {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");

    const navigate = useNavigate();

    // useEffect(() => {
    //     if(cpf.length === 3) setCpf(cpf + ".")
    // }, [cpf])

    const formatarCPF = (valor) => {
        // Remove caracteres não numéricos
        const apenasNumeros = valor.replace(/[^\d]/g, '');
    
        // Aplica a formatação
        const cpfFormatado = apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    
        // Atualiza o estado
        setCpf(cpfFormatado);
      };
    
      const handleChangeCPF = (e) => {
        formatarCPF(e.target.value);
      };

      const handleSave = (e) => {
        e.preventDefault();

        if(!cpf && !nome) {
            toast.warning("Nome e CPF não podem ser vazios")
        } else if (!cpf && nome) {
            toast.warning("CPF não pode ser vazio")
        } else if(!nome && cpf) {
            toast.warning("Nome não pode ser vazio")
        } else if(cpf.length !== 14) {
            toast.warning("CPF deve ter 11 dígitos e obedecer ao seguinte formato: 123.456.789-10");
        } else {
            const response = api.get("/clientes/exists/" + cpf)
                .then((res) => {
                    toast.warning("CPF já foi cadastrado")
                })
                .catch((err) => {
                    salvarCliente();
                })
        }

      }

      const salvarCliente = () => {
        let data: FormCliente = {
            "cpf": cpf,
            "nome": nome, 
            "email": null,
            "telefone": null,
            "endereco": null
        }

        if(email) data["email"] = email;
        if(telefone) data["telefone"] = telefone;
        if(endereco) data["endereco"] = endereco;

        const response = api.post("/clientes", data)
            .then((res) => {
                limparForm();
            })
            .catch((err) => {
                toast.error("Algo deu errado")
            })
      }

      const limparForm = () => {
        setCpf("");
        setNome("");
        setEmail("");
        setTelefone("");
        setEndereco("");

        toast.success("Cliente salvo com sucesso!");

        setTimeout(redirect, 3000);
      }

      const redirect = () => {
        navigate("/clientes");
      }

  return (
    <div className='h-screen flex'>
        <div>
            <Sidebar />
        </div>
        <div className='w-full flex flex-col justify-center items-center overflow-y-auto'>
            <h1 className='text-2xl mb-4 text-black text-bold'>Novo cliente</h1>
            <form onSubmit={handleSave}>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor="cpf" className="block text-sm font-bold text-gray-700">CPF:</label>
                        <input type="text" id="cpf" name="cpf" placeholder="Digite o CPF do cliente" value={cpf} className="w-full p-2 border border-gray-300 rounded bg-gray-100" onChange={handleChangeCPF} />
                    </div>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='nome' className='block text-sm font-bold text-gray-700'>Nome:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite o nome do cliente" value={nome} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setNome(e.target.value)} />
                    </div>

                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='telefone' className='block text-sm font-bold text-gray-700'>Telefone:</label>
                        <input type="text" id="telefone" name="telefone" placeholder='Digite o telefone do cliente' value={telefone} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setTelefone(e.target.value)} />
                    </div>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='email' className='block text-sm font-bold text-gray-700'>Email:</label>
                        <input type="email" id="email" name="email" placeholder='Digite o email do cliente' value={email} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className='w-full flex flex-row justify-center items-center'>
                    <div className='w-80 h-full flex flex-col justify-center items-center m-6'>
                        <label htmlFor='endereco' className='block text-sm font-bold text-gray-700'>Endereço:</label>
                        <input type="text" id="endereco" name="endereco" placeholder='Digite o endereço do cliente' value={endereco} className='w-full p-2 border border-gray-300 rounded bg-gray-100' onChange={(e) => setEndereco(e.target.value)} />
                    </div>
                    
                </div>
            </form>
            <div className='w-80 flex flex-col justify-center items-start'>
                <button type="submit" onClick={handleSave} className="w-80 bg-030637 text-white p-2 rounded cursor-pointer">+ Salvar cliente</button>
            </div>
            <ToastContainer autoClose={3000}/>
            
        </div>
    </div>
  )
}

export default NovoCliente