import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPowerOff } from 'react-icons/fa';
import { TiContacts } from 'react-icons/ti';

function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove os tokens do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redireciona para a página de login
    router.push('/login'); // Altere o caminho se necessário
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Link className='navbar-brand' href='/'>
          <TiContacts size={40} /> <strong>AgendaOnline</strong>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' href='/'>
                Início
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href={'/profile'}>
                Perfil
              </Link>
            </li>
          </ul>
          <span className='navbar-text' title='Log out'>
            <button className='btn btn-danger' onClick={handleLogout}>
              <FaPowerOff size={20} />
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
