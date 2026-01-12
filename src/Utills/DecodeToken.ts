import {jwtDecode} from "jwt-decode"

// Token structure interface
interface DecodedToken {
  id: number;
  name: string;
  role: string ;
  exp: number;
  iat: number;
}

// Decode token function
export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token.trim());
    console.log(decoded.role)
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
