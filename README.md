# TFC - Trybe Futebol Clube - Plataforma de Informações sobre Jogos e Classificações de Futebol 

## Descrição

O projeto TFC é o ultimo projeto do módulo de back-end no curso de desenvolvimento da Trybe, é um projeto full stack, que já vem com o front-end feito pela Trybe, apenas o back-end foi feito por mim, nele você consegue logar utilizando login e senha que gerarão um token de modo a garantir sua segurança, após o login, temos a exibição das partidas dos times, tanto em andamento quanto as encerradas, é possivel também ver a classificação dos times filtrando por partidas em casa, fora, ou geral.

<img src="https://i.imgur.com/4ddYsFZ.png" alt="Descrição da imagem" width="600" height="300" />

<img src="https://i.imgur.com/ZOVrC6S.png" alt="Descrição da imagem" width="600" height="300" />

## Tecnologias e Ferramentas

NodeJS, Docker, Typescript, Express, Sequelize, Chai

## Instalação

Clone o projeto em sua máquina, Para iniciar a aplicação, execute o comando para subir os contêineres:  docker compose up -d

Esse comando iniciara três contêineres: um para o banco de dados, outro para o back-end e o último para o front-end.
Após a inicialização, você poderá acessar o front-end na porta 3000 (por padrão) ou fazer requisições diretamente ao back-end através da porta 3001 (por padrão).
