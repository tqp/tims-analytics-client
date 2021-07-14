export class Token {
  public authorities: string;
  public exp: number;
  public iat: number;
  public iss: string;
  public sub: string;
  // Custom claims
  public userId: number;
  public username: string;
}
