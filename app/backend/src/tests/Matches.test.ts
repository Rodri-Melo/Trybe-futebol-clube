import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModels from '../database/models/Matches'
import matchesMock from './mocks/allMatches.mock'
import { Response } from 'superagent';
import MatchesServices from '../services/matches.services';
import MatchesController from '../controllers/matches.controllers';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /Matches', () => {
  let request: Response;
  beforeEach(async () => {
    sinon
      .stub(MatchesModels, "findAll")
      .onFirstCall()
      .resolves(matchesMock as unknown as MatchesModels[])
      // .onSecondCall()
      // .resolves(trueMatches as unknown as MatchesModels[]);
  });


  afterEach(() => {
    (MatchesModels.findAll as sinon.SinonStub).restore();
  })

  it('deve retornar todas as partidas', async () => {
    request = await chai.request(app).get('/matches')

    expect(request.body).to.be.deep.equal(matchesMock)
    expect(request.status).to.be.equal(200)
  })

  it('deve retornar todas as partidas em andamento', async () => {
    request = await chai.request(app).get('/matches?inProgress=true')


    expect(request.status).to.be.equal(200)
  })
  
  // describe('Quando o método finishMatches é chamado', () => {
  //   it('deve retornar um objeto com a mensagem "Finished"', async () => {
  //    request = await chai .request(app).get('/matches/1/finish').set('authorization', 
  //    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgxMDc1MTUzLCJleHAiOjE2ODExNDcxNTN9.jqapBPOOtfJT0-M0d6ZzPNT67nkUe00pkyMP8J5iPkY')
    
  //    expect(request.status).to.be.deep.equal(200);
  //   });
  // });
  
});

