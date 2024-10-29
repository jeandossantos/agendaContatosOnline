# Agenda de Contatos Online

O sistema **Agenda de Contatos Online** visa fornecer uma plataforma acessível e intuitiva para o gerenciamento de contatos pessoais e profissionais. Permite que os usuários criem, editem, visualizem e excluam seus contatos com facilidade, acessível de qualquer dispositivo que possua internet e navegador.

## **Requisitos**

- O sistema deve permitir o **cadastro de novos usuários**, com campos como ID, nome de usuário, e-mail e senha.
- O sistema deve permitir que usuários façam **login** para acessar suas informações e funcionalidades do sistema.
- O sistema deve permitir a **inserção de novos contatos**, com campos como nome, ID do usuário associado, telefone principal, telefone secundário, e-mail principal, e-mail secundário e endereço.
- O sistema deve permitir a **atualização das informações de um contato** existente, permitindo a edição dos dados previamente cadastrados.
- O sistema deve permitir a **consulta de contatos pelo nome**, facilitando a localização de contatos específicos.
- O sistema deve permitir a **exclusão de contatos**, removendo registros específicos do banco de dados.
- O sistema deve permitir a **visualização de um contato específico pelo ID**, mostrando todos os dados associados ao contato.

## Modelagem do Banco de Dados

![relacionamento.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/relacionamento.jpg)

### informações de esquema

![tabela users.png](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/tabela%20users.png)

![tabela contacts.png](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/tabela%20contacts.png)

## **Interface do sistema**
![login.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/login.png)

![register.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/register.png)

![home.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/home.png)

![profile.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/show%20contact.png)

![profile.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/edit%20contact.png)

![edit.jpg](https://github.com/jeandossantos/assets/blob/master/AgendaContatos/profile.png)
## Tecnologias

- **Node.js**
- **SQLite**
- **Prisma JS**
- **Express.js**
- **JSON Web Token**
- **Bootstrap**
- **Next.js**

###

## Como executar o projeto

### Pré-requisitos

- Node.js 20.x.x
- npm 10.x.x

### Back end

```bash
# clonar repositório
git clone <https://github.com/jeandossantos/agendaContatosOnline.git>

# entrar na pasta do projeto back end
cd backend

# instalar dependências
npm i

# roda migrations
npx prisma migrate dev

# executar o projeto
npm run dev

```

### Frontend
```bash
# entrar na pasta do projeto frontend web
cd web

# instalar dependências
npm install

# executar o projeto
npm run dev

```

### Popular Banco de dados com dados(Opcional)
```bash
npm run seed_user
```

## Utilizando a Aplicação
- Acesse: Abra seu navegador e vá para http://localhost:3000.
- Interaja: Utilize a interface da aplicação para adicionar, editar e excluir contatos.

- OBS: se você executou o a seed, poderá realizar log in com o email: usermock@oi.com e senha: 123456

## Autor
Jean Francisco dos Santos
