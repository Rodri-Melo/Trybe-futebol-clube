import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { GamesPerTeam, PointsPerTeam } from '../interfaces/Leaderboard';

class Leaderboard {
  static async getAllTeams() {
    const teams = await Teams.findAll({
      attributes: ['teamName', 'id'],
      raw: true,
    });

    return teams.map(({ teamName, id }) => ({ name: teamName, id }));
  }

  static async getAllMatches() {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    return matches;
  }

  static async getTotalGames(): Promise<GamesPerTeam> {
    const jogos: GamesPerTeam = {};
    const matches = await this.getAllMatches();

    matches.forEach((partida) => {
      jogos[partida.homeTeamId] = (jogos[partida.homeTeamId] || 0) + 1;
      jogos[partida.awayTeamId] = (jogos[partida.awayTeamId] || 0) + 1;
    });
    return jogos;
  }

  static getPoints(home: number, away: number) {
    if (home > away) {
      return [3, 0];
    } if (home < away) {
      return [0, 3];
    }
    return [1, 1];
  }

  static async calculatePoints(): Promise<PointsPerTeam> {
    const points: PointsPerTeam = {};
    const matches = await this.getAllMatches();
    matches.forEach((match) => {
      const [homePoints, awayPoints] = this
        .getPoints(match.homeTeamGoals, match.awayTeamGoals);

      points[match.homeTeamId] = (points[match.homeTeamId] || 0) + homePoints;
      points[match.awayTeamId] = (points[match.awayTeamId] || 0) + awayPoints;
    });

    return points;
  }

  static getMatchResult(home: number, away: number): [number, number, number] {
    if (home > away) {
      return [1, 0, 0];
    } if (home < away) {
      return [0, 0, 1];
    }
    return [0, 1, 0];
  }

  static async winsPerTeam() {
    const matches = await this.getAllMatches();
    const teamWins: Record<string, number> = {};

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        if (!teamWins[match.homeTeamId]) teamWins[match.homeTeamId] = 0;
        teamWins[match.homeTeamId] += 1;
      }
      if (match.awayTeamGoals > match.homeTeamGoals) {
        if (!teamWins[match.awayTeamId]) teamWins[match.awayTeamId] = 0;
        teamWins[match.awayTeamId] += 1;
      }
    });

    return teamWins;
  }

  static async drawsPerTeam() {
    const matches = await this.getAllMatches();
    const teamDraws: Record<string, number> = {};

    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        if (!teamDraws[match.homeTeamId]) teamDraws[match.homeTeamId] = 0;
        teamDraws[match.homeTeamId] += 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        if (!teamDraws[match.awayTeamId]) teamDraws[match.awayTeamId] = 0;
        teamDraws[match.awayTeamId] += 1;
      }
    });

    return teamDraws;
  }

  static async lossesPerTeam() {
    const matches = await this.getAllMatches();
    const teamslosses: Record<string, number> = {};

    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        if (!teamslosses[match.homeTeamId]) teamslosses[match.homeTeamId] = 0;
        teamslosses[match.homeTeamId] += 1;
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        if (!teamslosses[match.awayTeamId]) teamslosses[match.awayTeamId] = 0;
        teamslosses[match.awayTeamId] += 1;
      }
    });

    return teamslosses;
  }

  static async goalsFavor() {
    const matches = await this.getAllMatches();
    const goals: Record<number, number> = {};

    matches.forEach((match) => {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = match;

      if (!goals[homeTeamId]) {
        goals[homeTeamId] = 0;
      }

      goals[homeTeamId] += homeTeamGoals;

      if (!goals[awayTeamId]) {
        goals[awayTeamId] = 0;
      }

      goals[awayTeamId] += awayTeamGoals;
    });

    return goals;
  }

  static async goalsOwn() {
    const matches = await this.getAllMatches();
    const goalsOwn: Record<number, number> = {};

    matches.forEach((match) => {
      const { homeTeamId, awayTeamGoals, awayTeamId, homeTeamGoals } = match;

      if (!goalsOwn[homeTeamId]) {
        goalsOwn[homeTeamId] = 0;
      }

      goalsOwn[homeTeamId] += awayTeamGoals;

      if (!goalsOwn[awayTeamId]) {
        goalsOwn[awayTeamId] = 0;
      }

      goalsOwn[awayTeamId] += homeTeamGoals;
    });

    return goalsOwn;
  }

  static async all() {
    const teams = await this.getAllTeams();

    const gamesPerTeam = await this.getTotalGames();
    const winsPerTeam = await this.winsPerTeam();
    const drawsPerTeam = await this.drawsPerTeam();
    const lossesPerTeam = await this.lossesPerTeam();
    const goalsFavor = await this.goalsFavor();
    const goalsOwn = await this.goalsOwn();
    const pointsPerTeam = await this.calculatePoints();

    const teamsWithTotalGames = teams.map((team) => ({ name: team.name,
      totalPoints: pointsPerTeam[team.id] || 0,
      totalGames: gamesPerTeam[team.id] || 0,
      totalVictories: winsPerTeam[team.id] || 0,
      totalDraws: drawsPerTeam[team.id] || 0,
      totalLosses: lossesPerTeam[team.id] || 0,
      goalsFavor: goalsFavor[team.id] || 0,
      goalsOwn: goalsOwn[team.id] || 0,
    }));

    return teamsWithTotalGames;
  }

  static async goalsDiff() {
    const teams = await this.all();
    const result = teams.map((team) => team.goalsFavor - team.goalsOwn);
    return result;
  }

  static async sortAll() {
    await this.all();

    const sortedTeams = await this.all();
    const goalsDiff = await this.goalsDiff();

    const newData = sortedTeams.map((team, index) => ({
      name: team.name,
      totalPoints: team.totalPoints,
      totalGames: team.totalGames,
      totalVictories: team.totalVictories,
      totalDraws: team.totalDraws,
      totalLosses: team.totalLosses,
      goalsFavor: team.goalsFavor,
      goalsOwn: team.goalsOwn,
      goalsBalance: goalsDiff[index],
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));

    return newData;
  }

  static async sort() {
    const teams = await this.sortAll();

    teams.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) {
        return teamB.totalPoints - teamA.totalPoints;
      }

      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }

      if (teamA.goalsBalance !== teamB.goalsBalance) {
        return teamB.goalsBalance - teamA.goalsBalance;
      }

      return teamB.goalsFavor - teamA.goalsFavor;
    });

    return teams;
  }
}

export default Leaderboard;
