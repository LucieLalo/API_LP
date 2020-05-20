/**
 * roleAccess.
 * @param {String} role role to check.
 * @param {Array} granted granted role array.
 * @return {Error} if granted not include role : throw new Error("NotGranted").
 */
export const roleAccess = (role: string, granted: string[]): void => {
    if(granted[0] === "*") {
        granted = ["customer", "admin"];
    }
    
    if (!granted.includes(role) && granted != ["*"]) {
        // Vous n'êtes pas autorisé à accéder à cette ressource
        throw new Error("NotGranted");
    }
};