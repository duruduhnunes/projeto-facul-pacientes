# API de Clientes

API de gerenciamento de clientes construída com NestJS e Prisma.

## Configuração do banco de dados

O projeto usa PostgreSQL. Cada desenvolvedor roda o banco localmente.

### Ubuntu/Debian

```bash
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres createdb clientes
```

### Windows

Baixe e instale o PostgreSQL em https://www.postgresql.org/download/windows/ (marque a opção para iniciar como serviço).

Depois, abra o **SQL Shell (psql)** que vem instalado e rode:

```sql
ALTER USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE clientes;
```

## Instalação e execução

**1. Instale as dependências**

```bash
npm install
```

**2. Configure o banco de dados**

Crie o arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/clientes"
```

**3. Rode as migrations**

Cria as tabelas no banco de dados:

```bash
npx prisma migrate dev
```

**4. Gere o Prisma Client**

Se as tabelas já existem e você só quer gerar o client (ex: após clonar o repositório):

```bash
npx prisma generate
```

**5. Suba o servidor**

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3333` e a documentação Swagger em `http://localhost:3333/api`.

## Comandos úteis do Prisma

| Comando | O que faz |
|---|---|
| `npx prisma migrate dev` | Cria e aplica uma nova migration |
| `npx prisma generate` | Gera o Prisma Client a partir do schema |
| `npx prisma studio` | Abre uma interface visual para ver os dados do banco |
| `npx prisma migrate reset` | Apaga tudo e recria o banco do zero |
