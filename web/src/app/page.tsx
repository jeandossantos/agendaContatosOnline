'use client';

import ShowContactModal from '@/components/ShowContactModal';
import NavBar from '@/components/NavBar';
import { baseUrl } from '@/config/AxiosConfig';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import EditContactModal from '@/components/EditContactModal';
import FormContactModal from '@/components/FormContactModal';
import Footer from '@/components/Footer';

interface Contact {
  id: number;
  name: string;
  phone_number: string;
  phone_number_2?: string;
  email?: string;
  email_2?: string;
  address?: string;
  createdAt: number;
  updatedAt: number;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleListContacts();
  }, []);

  async function handleListContacts() {
    try {
      const token = localStorage.getItem('accessToken'); // Recupera o token do localStorage

      const {
        data: { data },
      } = await axios.get(`${baseUrl}/api/list?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
        },
      });

      setContacts(
        data.map((c: any) => ({
          ...c,
          createdAt: c.created_at, // Corrigido para c.created_at
          updatedAt: c.updated_at, // Corrigido para c.updated_at
        }))
      );
    } catch (error) {
      setAlert({ message: 'Erro ao listar contatos.', type: 'danger' });
      console.log(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`${baseUrl}/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAlert({ message: 'Contato excluído com sucesso.', type: 'success' });
      handleListContacts();
    } catch (error) {
      setAlert({ message: 'Erro ao excluir contato.', type: 'danger' });
      console.log(error);
    }
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == 'Enter') {
      e.preventDefault();
      handleListContacts();
    }
  }

  return (
    <>
      <NavBar />

      <div className='content mt-5 mx-3'>
        <h1 className='text-center'>Meus Contatos</h1>

        <div className='d-flex justify-content-between my-3 '>
          <div className='input-group' style={{ width: 400 }}>
            <span className='input-group-text' id='basic-addon1'>
              <FaSearch />
            </span>
            <input
              className='form-control'
              type='search'
              placeholder='Pesquisar'
              aria-label='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target='#formContactModal'
            className='btn btn-dark'
            title='Criar novo contato'
          >
            {' '}
            <FaPlus size={20} />
          </button>
        </div>

        {/* Exibe o alerta se existir */}
        {alert && (
          <div className={`alert alert-${alert.type}`} role='alert'>
            {alert.message}
          </div>
        )}

        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th scope='col'>Nome</th>
              <th scope='col'>Telefone</th>
              <th scope='col'>Email</th>
              <th scope='col'>Endereço</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: Contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.phone_number}</td>
                <td>{contact.email || 'N/A'}</td>
                <td>{contact.address || 'N/A'}</td>
                <td className='d-flex gap-1'>
                  <button
                    className='btn btn-secondary'
                    onClick={() => setSelectedContact(contact)}
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#showContactModal'
                  >
                    <FaEye />
                  </button>

                  <button
                    className='btn btn-warning'
                    onClick={() => setSelectedContact(contact)}
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#staticBackdrop'
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(contact.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ShowContactModal contact={selectedContact!} />

        <EditContactModal
          contact={selectedContact!}
          handleListContacts={handleListContacts}
          setContact={setSelectedContact}
          setContacts={setContacts}
        />

        <FormContactModal handleListContacts={handleListContacts} />
      </div>
      <Footer />
    </>
  );
}
