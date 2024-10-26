import { baseUrl } from '@/config/AxiosConfig';
import React, { useState } from 'react';
import axios from 'axios';

interface Contact {
  name: string;
  phone_number: string;
  phone_number_2?: string;
  email?: string;
  email_2?: string;
  address?: string;
}

interface ContactModalProps {
  handleListContacts: () => void;
}

const initialStateContact = {
  name: '',
  phone_number: '',
  phone_number_2: '',
  email: '',
  email_2: '',
  address: '',
};

export default function FormContactModal({
  handleListContacts,
}: ContactModalProps) {
  const [contact, setContact] = useState<Contact>(initialStateContact);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');

      await axios.post(`${baseUrl}/api/create`, contact, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho da requisição
        },
      });

      setAlert({ message: 'Contato cadastrado com sucesso!', type: 'success' });
      setContact(initialStateContact);

      handleListContacts();
    } catch ({ response }: any) {
      console.log(response.data);
      setAlert({
        message: response?.data?.message || 'Erro ao cadastrar contato.',
        type: 'error',
      });
    }
  }

  return (
    <div
      className='modal fade'
      id='formContactModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              Criar Contato
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            {alert && (
              <div
                className={`alert alert-${
                  alert.type === 'success' ? 'success' : 'danger'
                } alert-dismissible fade show`}
                role='alert'
              >
                {alert.message}
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'
                ></button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Nome
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={contact?.name || ''}
                  onChange={handleChange}
                  required
                  placeholder='ex: John Doe'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='phone_number' className='form-label'>
                  Telefone
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='phone_number'
                  name='phone_number'
                  value={contact?.phone_number || ''}
                  onChange={handleChange}
                  required
                  placeholder='ex: 9 7070-7070'
                  pattern='^9 \d{4}-\d{4}$'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='phone_number_2' className='form-label'>
                  Telefone Alternativo
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='phone_number_2'
                  name='phone_number_2'
                  value={contact?.phone_number_2 || ''}
                  onChange={handleChange}
                  placeholder='ex: 9 7070-7070'
                  pattern='^9 \d{4}-\d{4}$'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={contact?.email || ''}
                  onChange={handleChange}
                  placeholder='ex: johndoe@hotmail.com'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email_2' className='form-label'>
                  Email Alternativo
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email_2'
                  name='email_2'
                  value={contact?.email_2 || ''}
                  onChange={handleChange}
                  placeholder='ex: johndoe@gmail.com'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='address' className='form-label'>
                  Endereço
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='address'
                  name='address'
                  value={contact?.address || ''}
                  onChange={handleChange}
                  placeholder='AV. Pelé, 456'
                />
              </div>
              <div className='modal-footer'>
                <button type='submit' className='btn btn-primary'>
                  Cadastrar
                </button>
                <button
                  type='submit'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
