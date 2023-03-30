import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamsModels from '../database/models/Teams';
import allTeamsMock from './mocks/teams.mock';
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {
  let request: Response;
  beforeEach(async () => {
    sinon
      .stub(TeamsModels, "findAll")
      .resolves(allTeamsMock.allTeams as TeamsModels[]);
  });

  afterEach(() => {
    (TeamsModels.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /teams o retorno é correto', async () => {
    request = await chai.request(app).get('/teams')

    expect(request.body).to.be.deep.equal(allTeamsMock)
    expect(request.status).to.be.equal(200)
  });

  beforeEach(async () => {
    sinon
      .stub(TeamsModels, "findOne")
      .resolves(allTeamsMock.team as TeamsModels);
  });

  afterEach(() => {
    (TeamsModels.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /teams/id o retorno é correto', async () => {
    request = await chai.request(app).get('/teams/4')

    expect(request.body).to.be.deep.equal(allTeamsMock.team)
    expect(request.status).to.be.equal(200)
  })
})