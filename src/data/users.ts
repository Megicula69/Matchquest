export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
}

export const users: User[] = [
  {
    username: 'admin',
    password: 'adminpassword',
    role: 'admin',
    fullName: 'Lungsod Administrator'
  },
  {
    username: 'player',
    password: 'playerpassword',
    role: 'user',
    fullName: 'Elite Gamer'
  },
  {
    username: 'student123',
    password: 'studentpassword',
    role: 'user',
    fullName: 'PLP Student'
  }
];
