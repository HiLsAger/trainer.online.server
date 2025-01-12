export class AuthHelper {
  public static removeBearer(bearerToken: string): string {
    return bearerToken.startsWith("Bearer ")
      ? bearerToken.substring(7)
      : bearerToken;
  }
}
