import Teams from '../database/models/Teams';

class TeamsService {
  static async getAllTeams() {
    const teams = await Teams.findAll();

    return teams;
  }
}

// class TeamsById {
//   static async getTeamsById(teamId: number) {
//     const teams = await Teams.findByPk(teamId);

//     return teams;
//   }
// }

export default TeamsService;
