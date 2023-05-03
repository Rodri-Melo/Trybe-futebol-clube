import LeaderboardAway from '../utils/leaderboardAway';
import LeaderboardHome from '../utils/leaderboardHome';

class LeaderboardService {
  static async orderedHome() {
    const teams = await LeaderboardHome.sort();
    return teams;
  }

  static async orderedAway() {
    const teams = await LeaderboardAway.sort();
    return teams;
  }
}

export default LeaderboardService;
