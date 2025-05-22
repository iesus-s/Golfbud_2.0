import { JwtPayload as DefaultJwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends DefaultJwtPayload {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  friends: string[];
}

// Export an object (not recommended, but works if needed)
const jwtPayloadExport = {} as CustomJwtPayload;
export default jwtPayloadExport;
