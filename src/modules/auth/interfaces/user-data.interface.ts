export interface IUserData {
  id: number; // userId
  role: number;
  doctor?: {
    id: number;
    specialization: string;
  };
}
