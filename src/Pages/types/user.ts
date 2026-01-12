export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "subadmin" | "employee";
  image?: string;
}
