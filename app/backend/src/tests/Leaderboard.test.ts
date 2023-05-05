import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /Leaderboard', () => {
  let httpRes: Response;

  it('Leaderboard', async () => {
    httpRes = await chai.request(app).get('/leaderboard');

    expect(httpRes.status).to.be.equal(200);
  });

 
});