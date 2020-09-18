<h1 align="center">Intranett<br>
<span align="center">Node.js | ReactJS | PostgreSQL</span>
</h1>
<h3 align="center">Projeto desenvolvido para processo seletivo da Intranett</h3>

# Objetivo

Desenvolver um sistema simples de gerenciamento de tarefas.

# Como executar

- ### Pré-requisitos
  - É **necessário** possuir o **[Docker](https://docs.docker.com/get-docker/)** instalado.
 
1. #### Faça um clone do repositório:
```sh
$ git clone https://github.com/syllomex/intranett.git "nome do diretorio"
```

2. #### Executando a aplicação.
```sh
# Execute na raiz do projeto
$ docker-compose up

# Pode levar alguns minutos
# Esse comando criará os containers database, server e web
```

3. #### Migration
```sh
# Na CLI do container server
$ yarn typeorm migration:run
```

- Se tudo der certo, você já pode acessar a aplicação em http://localhost:3000.

4. #### Acessar como Gestor
```sh
# Na CLI do container database
$ psql -U intranett
$ update users set access=1 where email='[email do usuário]';
```

- Após isso, se estiver logado no site, saia e entre novamente para que o token seja atualizado.

5. #### Possíveis erros

```JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.```
- Esse erro ocorre no VSCode por não detectar as dependências instaladas nos containers. Para resolver, execute um ```yarn``` dentro dos diretórios ```server``` e ```web```. Isso instalará todas as dependências no host, removendo os erros.
