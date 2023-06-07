export interface ILoginUser {
      email: string;
      password: string;
}

export interface ISigninUser {
      name: string;
      email: string;
      password: string;
}

export interface ITokenUser {
      token: string;
      expiration: Date;
}