'use client';
import './register.css';
import { TiContacts } from 'react-icons/ti';
import { useState } from 'react';
import { baseUrl } from '@/config/AxiosConfig';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleResetForm() {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccess(null);
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
      });

      // Exibe mensagem de sucesso e limpa o formulário

      setSuccess('Conta criada com sucesso!');

      // Redireciona após alguns segundos
      setTimeout(() => {
        router.push('/login');
        handleResetForm();
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='form-wrapper'>
        {error && <div className='alert alert-danger'>{error}</div>}
        {success && <div className='alert alert-success'>{success}</div>}
        <form onSubmit={handleRegister}>
          <div className='d-flex justify-content-center align-items-center'>
            <TiContacts size={100} />
          </div>
          <h1 className='register-title'>Crie a sua conta</h1>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Nome
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Senha
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='confirmPassword' className='form-label'>
              Confirmar Senha
            </label>
            <input
              type='password'
              className='form-control'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className='d-grid gap-2 col-12 mx-auto'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Registrar'}
            </button>
          </div>
          <div className='d-flex justify-content-center align-items-center flex-column mt-1'>
            <p className='text-center mb-0'>Ou</p>
            <Link href={'/login'}>Já tenho uma conta</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
