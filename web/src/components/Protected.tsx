'use client';
import { baseUrl } from '@/config/AxiosConfig';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const {
          data: { isValid },
        } = await axios.post(`${baseUrl}/auth/validateToken`, { token });

        if (!isValid && usePathname() != '/register') {
          localStorage.removeItem('accessToken');
          router.push('/login');
        }

        // if (isValid) {
        //   if (usePathname() == '/register' || usePathname() == '/login') {
        //     router.push('/');
        //   }
        // }
      } catch (error) {
        console.error('Erro ao validar o token:', error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Enquanto verifica a autenticação, você pode exibir um carregando ou retornar nulo
  if (typeof window === 'undefined') {
    return null;
  }

  return <>{children}</>;
}

export default Protected;
