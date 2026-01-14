export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;

  assigned_to?: {
    _id?: string;
    name?: string;
    email?: string;
  };

  createdAt?: string;
}
