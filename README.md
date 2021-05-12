# Technologies Used

- Nodejs
- Typescript
- Jest / TDD
- MVC / DDD
- AWS S3 - SES
- CI / CD
- Postgres
- Eslint

```json
  Open the project and write

  yarn

  Clone file .env.example to .env and fill it

  yarn typeorm migration:run

  yarn dev
```

<br />

## Under Development

## Session
- Forgot password email send - POST api/password/forgot
```json
{
	"email": "alancamargo50@gmail.com"
}
```
![Print App](./assets/email.png)

- Reset password email user - POST api/password/reset
```json
{
	"password": "123456",
	"password_confirmation": "123456",
	"token": "731b14b9-005c-48e8-9ab1-9545a4451c6b"
}
```

## Admin
- Create User - POST api/users/
```json
{
	"name": "Alan Henrique",
	"email": "alancamargo50@gmail.com",
	"password": "123456",
	"type": "global",
	"status": "active"
}
```

- List All Users - GET api/users
```json
[
  {
    "id": "0971e9b5-5051-46b2-b745-8d21402aa739",
      "name": "Alan Henrique",
      "email": "alancamargo50@gmail.com",
      "type": "root",
      "status": "active",
      "created_at": "2021-05-11T06:01:01.946Z",
      "updated_at": "2021-05-11T06:01:01.946Z",
      "avatar_url": null
  }
]
```

- Update User - PUT api/users/:id
```json
{
	"name": "Alan Henrique",
	"email": "alan@alan.com",
	"type": "root",
	"status": "active",
	"password": "123456", // Optional
	"password_confirmation": "123456" // Required if filled in "password"
}
```

- Delete User - DELETE api/users/:id

- Create Type - POST api/types/
```json
{
	"type": "root",
	"description": "Admin master"
}
```

- List All Types - GET api/types
```json
[
  {
    "id": "1aca8116-34e3-46a7-83e2-ceb8c7225548",
    "type": "admin",
    "description": "Second Admin master but not root",
    "created_at": "2021-05-12T19:07:33.186Z",
    "updated_at": "2021-05-12T19:07:33.186Z"
  },
  {
    "id": "a28790bd-9aec-4f8f-9e9e-01a24378770b",
    "type": "root",
    "description": "Admin master",
    "created_at": "2021-05-11T06:15:51.678Z",
    "updated_at": "2021-05-11T06:15:51.678Z"
  }
]
```

- Delete Type - DELETE api/types/:typeId

<br />

## General
- List Profile Info - GET api/profile
```json
{
	"id": "5796e009-e0d4-46bb-9593-f621c87034bd",
  "name": "Alan Henrique",
  "email": "alancamargo50@gmail.com",
  "type": "global",
  "status": "active",
  "created_at": "2021-05-09T08:09:10.614Z",
  "updated_at": "2021-05-09T08:09:10.614Z",
  "avatar_url": null
}
```

- Update Profile - PUT api/profile
```json
{
	"name": "Alan Henrique",
	"email": "alan@alan.com",
	"old_password": "123456", // Optional
	"password": "123456", // Required if filled in "old_password"
	"password_confirmation": "123456" // Required if filled in "old_password"
}
```

- Upload User Avatar - PATCH api/profile/avatar
```json
{
  // Multipart data
	"avatar": "avatar.png",
}
```
<br />
<br />

### Desafio

Para este teste, você vai criar uma API REST que possibilite um cadastro de usuários e login, com as seguintes funcões:


**Usuários**
- [X] Cadastrar um novo usuário
- [X] Listar informações de um usuário
- [X] Alterar o nome e tipo de um usuário
- [X] Excluir um usuário
- [X] Alterar o status de um usuário(ativo e inativo)

**Tipos**
- [X] Listar todos os tipos cadastrados



### Regras de negócio
- [X] A tabela de usuários deve conter os campos nome, senha, tipo, email e status.
- [X] A tabela de tipos deve a descrição do tipo.
- [X] Um usuário tem apenas um único tipo
- [X] Apenas usuários do tipo root e admin podem cadastrar novos usuários.
- [X] Apenas usuários do tipo root admin podem alterar qualquer informação do usuário(inclusive status);
- [X] Apenas usuários root podem excluir usuários
- [X] Usuários do tipo geral só tem acesso a listar informações de seu próprio usuário, bem como alterar suas próprias informações.
- [X] O login deve ser feito com email e senha.



## Requisitos
- O projeto deve ser documentado, principalmente a arquitetura utilizada e as rotas para cada tarefa.
- [X] O projeto deve ser construído com Typescript
- [X] O projeto deve ter uma cobertura considerável de testes unitários

![Print App](./assets/tests.png)

### 🚫 O que não pode? (por favor 🙏😂)

- [X] usar eslint-disable em qualquer lugar
- [X] usar tipagem any (sem preguiça!)
- deixar qualquer warning ou erros no console do servidor
- [X] deixar erros do eslint
- códigos comentados
- console logs
- [X] fazer apenas 1 commit com todo código
