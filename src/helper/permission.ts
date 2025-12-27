import User from "../models/user.model";

export const uploadProductPermission = async (userId: string) => {
  const existUser = await User.findById(userId);

  if (existUser) {
    if (existUser.role === "ADMIN") {
      return true;
    }
    return false;
  }
};
