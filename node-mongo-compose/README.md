# Sistema de Registro (Node + MongoDB + Docker Compose)

Este repositório contém um sistema de registro (registration system) composto por uma API backend em Node.js, uma base de dados MongoDB e uma interface frontend estática. Tudo é empacotado e orquestrado com Docker Compose para facilitar desenvolvimento e deploy local.

## Visão geral da arquitetura

- Backend: Node.js (Express) localizado em `backend/`.
  - Expõe endpoints HTTP para criar e listar registros.
- Banco de dados: MongoDB, utilizado como persistência.
- Frontend: Arquivos estáticos (HTML/CSS) em `frontend/` que consomem a API do backend.
- Orquestração: `docker-compose.yml` define três serviços: `backend`, `db` (MongoDB) e `frontend` (Nginx ou servidor estático).

## Pré-requisitos

- Docker Desktop instalado e em execução.
- Docker Compose (já incluído no Docker Desktop moderno).
- Em Windows, PowerShell é o shell recomendado para os comandos abaixo.

## Como rodar (Modo rápido)

1. Abra um terminal (PowerShell) na raiz do projeto (`node-mongo-compose`).
2. Execute:

```powershell
docker-compose up --build
```

3. Após o build, os serviços ficarão disponíveis:
- Backend: http://localhost:3000 (ou porta definida em `docker-compose.yml`)
- Frontend: http://localhost:80
- MongoDB: porta padrão do contêiner (não exposta necessariamente ao host)

4. Para rodar em background:

```powershell
docker-compose up -d --build
```

5. Para parar e remover containers, redes e volumes criados pelo Compose:

```powershell
docker-compose down --volumes
```

## Variáveis de ambiente importantes

Verifique o `docker-compose.yml` e `backend/package.json` (ou arquivos de configuração do backend) para variáveis como:

- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD
- MONGO_DB_NAME
- PORT (para o backend)

Garanta que as variáveis estão corretas no `docker-compose.yml` ou use um arquivo `.env` para mantê-las fora do controle de versão.

## Endpoinnts principais (exemplo)

- POST /registrations — cria um novo registro (body JSON)
- GET /registrations — lista registros

> Observação: verifique a implementação real no arquivo `backend/app.js` para confirmar os endpoints exatos e campos esperados.

## Desenvolvimento e depuração

- Logs do Docker Compose: `docker-compose logs -f` ou `docker-compose logs -f backend`.
- Acesse dentro do container (ex.: backend):

```powershell
docker-compose exec backend sh
# ou, se container usa bash
docker-compose exec backend bash
```

- Para inspecionar o banco MongoDB (se porta exposta) use um cliente GUI (MongoDB Compass) apontando para `mongodb://<user>:<password>@localhost:<port>/<db>`.

## Testes e validação rápida

- Você pode usar `curl` ou o Insomnia/Postman para enviar requisições ao backend.

Exemplo com curl (Windows PowerShell):

```powershell
curl -Method POST -Uri http://localhost:3000/registrations -ContentType 'application/json' -Body '{"name":"João","email":"joao@example.com"}'
```

## Troubleshooting

- Erro: `ECONNREFUSED` ao acessar o backend → Verifique se o container do backend está rodando (`docker ps`) e se a porta mapeada está correta.
- Erro: Conexão com MongoDB falha → Verifique variáveis de ambiente e se o serviço `db` iniciou corretamente (`docker-compose logs db`).
- Permissões/volumes → Se estiver com dados persistentes antigos, faça `docker-compose down --volumes` para resetar.


