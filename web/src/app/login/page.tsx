'use client';
import { TiContacts } from 'react-icons/ti';
import './login.css';
import { useState } from 'react';
import { baseUrl } from '@/config/AxiosConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleResetForm() {
    setEmail('');
    setPassword('');
    setError(null); // Reset error message
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reseta erro antes de uma nova tentativa
    setLoading(true); // Ativa o loading

    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      // Salva os tokens no localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      handleResetForm();

      // Redireciona para a página inicial
      router.push('/');
    } catch (err: any) {
      setError(err.response.data.message); // Mensagem de erro para o usuário
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='form-wrapper'>
        {error && <div className='alert alert-danger'>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className='d-flex justify-content-center align-items-center'>
            <TiContacts size={100} />
          </div>
          <h1 className='login-title'>Acesse a sua agenda</h1>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              aria-describedby='emailHelp'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id='emailHelp' className='form-text'>
              Não dividiremos seu e-mail com ninguém.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Senha
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='d-grid gap-2 col-12 mx-auto'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </div>

          <div className='d-flex justify-content-center align-items-center flex-column mt-1'>
            <p className='text-center mb-0'>Ou</p>
            <Link href={'/register'}>Crie uma conta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
