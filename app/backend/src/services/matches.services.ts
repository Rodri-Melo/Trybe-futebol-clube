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
}

export default MatchesServices;
