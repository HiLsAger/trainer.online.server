export class authTokenResponse {
  token: string;
  created: Date;
  life_time: number;
  user: {
    id: number;
    login: string;
    name: string;
  };
}
