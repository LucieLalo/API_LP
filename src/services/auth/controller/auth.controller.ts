import { UserModel } from "services/user/models/user.model";

export class AuthController {

    constructor() { }

    /**
     * login user.
     */
    login = async (credential: { email: string, password: string }) => {
        try {
            const user = await UserModel.findOne({ email: credential.email })
                .select("role firstName lastName email tel password");
            if (!user) { throw new Error('UserNotFoundLogin') }

            return await user.comparePassword(credential.password);
        }

        catch (err) {
            throw new Error(err.message);
        }
    }
}
