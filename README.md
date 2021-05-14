# Repositório Rest Api - Auditoria de Sites com Lighthouse

Contém aplicação NodeJS com Express e [bull](https://github.com/OptimalBits/bull) que recebe uma url qualquer e retorna relatório completo através do [Lighthouse](https://www.npmjs.com/package/lighthouse). Cada relatório é processado em off no servidor e vai para um banco de dados Redis.

## Ambiente de desenvolvimento

Necessário ter um Redis em execução antes de iniciar, por padrão a rest api se conecta por com a url `redis://127.0.0.1:6379`. É possível criar um banco através do docker:

```bash
>> docker run --name redis -p 6379:6379 -d redis:alpine
```

Intalação de dependências:

```bash
>> yarn install
```

Execução:

```bash
>> yarn run dev
```

## Ambiente de produção

A aplicação é pensada para deploy no Heroku, dessa forma foi incluido um arquivo `Procfile`, detalhes adicionais ainda devem ser incluidos já que nenhum teste real foi feito.

```bash
>> yarn run start
```

## Rotas

- **GET** / - check da API
- **POST** /audit - executa auditoria de algum site e retorna ID do job

  ```bash
  // Body da requisição
  {
    "url_site": "https://asimovjr.com.br"
  }
  ```

- **GET** /audit/:id - retorna status e relatório de um ID

## Referências

- [Worker Dynos](https://devcenter.heroku.com/articles/background-jobs-queueing)
- [Heroku-Redis](https://elements.heroku.com/addons/heroku-redis)
