const User = require("../models/user");

export interface AuthenticatedRequest extends Request {
    // isAuthenticated: () => boolean;
    user: typeof User;
}

export interface AuthenticatedRequestWithId extends AuthenticatedRequest {
  params: {
    id: string;
  };
}
