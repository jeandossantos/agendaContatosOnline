'use client';

import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface User {
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // Decodifica o payload do token
        const payload = JSON.parse(atob(token.split('.')[1]));

        // Extrai o nome e email do payload
        const { username: name, email } = payload;

        // Atualiza o estado do usuário
        setUser({ name, email });
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className='content mt-5 mx-3 d-flex justify-content-center align-items-center flex-column'>
        <h1 className='text-center'>Perfil</h1>
        <FaUserCircle size={200} />
        {user && (
          <form className='mt-3 w-25'>
            <div className='mb-3 d-flex align-items-center'>
              <label htmlFor='name' className='form-label me-2'>
                Nome:
              </label>
              <input
                type='text'
                className='form-control flex-grow-1'
                id='name'
                value={user.name}
                readOnly
              />
            </div>
            <div className='mb-3 d-flex align-items-center'>
              <label htmlFor='email' className='form-label me-2'>
                Email:
              </label>
              <input
                type='email'
                className='form-control flex-grow-1'
                id='email'
                value={user.email}
                readOnly
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
}
