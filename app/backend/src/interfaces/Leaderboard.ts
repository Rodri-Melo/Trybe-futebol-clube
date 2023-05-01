// export type Games = {
//   timeA: string;
//   timeB: string;
// };

export type GamesPerTeam = {
  [time: string]: number;
};

export type PointsPerTeam = {
  [teamId: string]: number
};

export interface Goals {
  goals: number
}
