import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

class MatchesServices {
  static async getAllMatches() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getInProgressMatches(inProgress : boolean) {
    const matches = await Matches.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async finishMatches(id: number) {
    const findId = await Matches.update({ inProgress: false }, { where: { id } });
    return findId;
  }

  static async updateInProgressMatches(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const findId = await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return findId;
  }

  static async newMatches(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    const newMatche = await Matches.create(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true },
    );
    return newMatche;
  }

  // static async equalTeam(homeTeamId: number, awayTeamId: number) {
  //   const valid = await Matches.findOne({
  //     where: {
  //       homeTeamId,
  //       awayTeamId,
  //     },
  //   });
  //   return valid;
  // }
}

export default MatchesServices;
