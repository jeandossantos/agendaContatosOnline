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

interface ContactModalProps {
  contact: Contact | null; // Permitir que contact possa ser null
}

export default function ShowContactModal({ contact }: ContactModalProps) {
  return (
    <div
      className='modal fade'
      id='showContactModal'
      data-bs-backdrop='static'
      data-bs-keyboard='true'
      tabIndex={-1}
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='staticBackdropLabel'>
              Detalhes do Contato
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <h2 className='text-center'>{contact?.name}</h2>

            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <td>
                    <strong>ID:</strong>
                  </td>
                  <td>{contact?.id || ''}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Telefone:</strong>
                  </td>
                  <td>{contact?.phone_number || ''}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Telefone Alternativo:</strong>
                  </td>
                  <td>{contact?.phone_number_2 || 'N/A'}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{contact?.email || 'N/A'}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email Alternativo:</strong>
                  </td>
                  <td>{contact?.email_2 || 'N/A'}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Endereço:</strong>
                  </td>
                  <td>{contact?.address || 'N/A'}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Criado em:</strong>
                  </td>
                  <td>
                    {new Date(contact?.createdAt || 'N/A').toLocaleDateString()}{' '}
                    {new Date(contact?.createdAt || 'N/A').toLocaleTimeString()}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Atualizado em:</strong>
                  </td>
                  <td>
                    {new Date(contact?.updatedAt || 'N/A').toLocaleDateString()}{' '}
                    {new Date(contact?.updatedAt || 'N/A').toLocaleTimeString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-dismiss='modal'
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
