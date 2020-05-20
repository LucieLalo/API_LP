import { UserModel, User, UserDocument } from "../models/user.model";

export class UserController {

  constructor() { }

  /**
   * Create an user.
   * @param {User} _data User data.
   * @return {object} token.
   */
  create = async (_data: User) => {
    try {
      let user = new User(_data);
      let newUser = new UserModel(user);
      await newUser.save();

      return;
    }

    catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Get users list.
   * @return {User[]} users.
   */
  getList = async () => {
    try {
      let users = await UserModel.find().select("role firstName lastName email tel");
      return { users: users };
    }

    catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * Get current user.
   * @param {string} _userId User id.
   * @return {User} user.
   */
  getMe = async (userSession: UserDocument) => {
    try {
      let user = await UserModel.findOne({ _id: userSession._id }).select("pseudo email");
      if (!user) {
        throw new Error("UserNotFoundLogin");
      }

      return { user: user };
    }

    catch (err) {
      console.error(err)
      throw new Error(err.message);
    }
  }
}