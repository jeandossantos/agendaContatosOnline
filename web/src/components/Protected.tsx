'use client';
import { baseUrl } from '@/config/AxiosConfig';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('use effect');
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Token', token);

        if (!token) {
          router.push('/login');
          setIsLoading(false);
          return;
        }

        const request = await axios.post(`${baseUrl}/auth/validateToken`, {
          token,
        });

        const isValid = request.data;

        if (!isValid && usePathname() != '/register') {
          localStorage.removeItem('accessToken');
          router.push('/login');
        }

        setIsLoading(false);
      } catch (error) {
        console.log('Erro ao validar o token:', error);
        localStorage.removeItem('accessToken');
        router.push('/login');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div
          className='spinner-border text-primary spinner-border-lg'
          role='status'
        >
          {' '}
           <span className='visually-hidden'>Loading...</span>
        </div>{' '}
         
      </div>
    ); // Show loading indicator
  }

  return <>{children}</>;
}

export default Protected;
