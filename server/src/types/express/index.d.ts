// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  export type MyPayload = JwtPayload & { sub: string };
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
      //propriétés nouvelles créent sur ma requete, faire muter des propriétés, sert à communiquer des propriétés sur
      // res et res entre les middlewear;
      auth: MyPayload;
    }
  }
}
