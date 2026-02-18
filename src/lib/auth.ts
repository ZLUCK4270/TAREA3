export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'manager';
  points: number;
  badges: string[];
}

export const MOCK_USER: User = {
  id: '1',
  name: 'Luciano Acuña',
  email: 'luciano@example.com',
  role: 'employee',
  points: 1250,
  badges: ['Early Bird', 'Team Player'],
};

export const login = async (_email: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER);
    }, 1000);
  });
};
