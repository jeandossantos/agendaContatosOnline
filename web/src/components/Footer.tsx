import { TiContacts } from 'react-icons/ti';

export default function Footer() {
  return (
    <footer className='bg-white mt-5 px-4  py-4 footer text-center'>
      <hr />
      <TiContacts size={40} color='#000' /> &copy; 2024 AgendaOnline, Inc
    </footer>
  );
}
