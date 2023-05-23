# TFC - Trybe Futebol Clube - Plataforma de Informações sobre Jogos e Classificações de Futebol 
<!--
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->

O projeto TFC é o ultimo projeto do módulo de back-end no curso de desenvolvimento da Trybe, é um projeto full stack, que já vem com o front-end feito, apenas o back-end foi feito por mim, nele você consegue fazer logar utilizando lgin e senha que gerarão um token de modo a garantir sua segurança, após o login, temos a exibição das partidas dos times, tanto em andamento quanto as encerradas, é possivel também ver a classificação dos times filtrando por partidas em casa, fora, ou geral.

## Tecnologias

NodeJS, Docker, Typescript, Express, Sequelize, Chai

## Instalação

Clone o projeto em sua máquina, Para iniciar a aplicação, execute o seguintes comandos para subir os contêineres:  docker compose up -d

Esses comandos iniciarão três contêineres: um para o banco de dados, outro para o back-end e o último para o front-end.
Após a inicialização, você poderá acessar o front-end na porta 3000 (por padrão) ou fazer requisições diretamente ao back-end através da porta 3001 (por padrão).
