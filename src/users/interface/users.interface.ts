import { Document } from 'mongoose';

export interface Users {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;
  readonly createAt: Date;
  readonly token: string;
  readonly tokenExpires: Date;
  readonly tokenSubject: string;
  readonly verify: boolean;
  readonly isAdmin: boolean;
}

export type UsersDoc = Document & Users;
