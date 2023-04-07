import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize'
import Users from '../database/models/Users'
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /Users', () => {
  it('deve retornar um erro se não houver email ou password', async () => {
    const httpRes = await chai.request(app).post('/login').send({})

    expect(httpRes.status).to.equal(400)
    expect(httpRes.body).to.deep.equal({ message: "All fields must be filled" })
  })
  it('deve retornar um erro se o email estiver em um formato errado', async () => {
    const httpRes = await chai.request(app).post('/login').send({
      email: 'blablatest.com',
      password: '1234567'
    })

    expect(httpRes.status).to.equal(401)
    expect(httpRes.body).to.deep.equal({ message: "Invalid email or password" })
  })
  it('deve retornar um erro se password for menor do que 6 caracteres', async () => {
    const httpRes = await chai.request(app).post('/login').send({
      email: 'blablatest@gmail.com',
      password: '123'
    })

    expect(httpRes.status).to.equal(401)
    expect(httpRes.body).to.deep.equal({ message: "Invalid email or password" })
  })
  describe('quando o POST foi feito com sucesso', () => {
    it('deve retornar status 200', async () => {
      const user = {
        id: 1,
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      }

      sinon.stub(Model, 'findOne').resolves(user as Users);
      const httpRes = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        })

      expect(httpRes.status).to.be.equal(200)
    })
  })
});