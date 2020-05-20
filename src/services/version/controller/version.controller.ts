import { version } from "../../../../package.json";

export class VersionController {

    constructor() { }

    /**
     * login user.
     * @param {object} _credential email & password.
     * @return {object} token.
     */
    getVersion = async () => {
        try {
            const apiVersion = version;

            return { apiVersion: apiVersion };
        }

        catch (err) {
            throw new Error(err.message);
        }
    }

}
