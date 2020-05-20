import { AES, enc } from 'crypto-js';

/**
 * Encrypt.
 * @param {object} data Data object.
 * @param {string} encryptionKey Encryption key.
 * @return {string} Encrypted string.
 */
export const encrypt = (data: object, encryptionKey: string) => {
    // Define object with encrypted data.
    return {
        data: AES.encrypt(
            JSON.stringify(data),
            encryptionKey
        ).toString()
    };
};


export const decrypt = (encryptedData: string, encryptionSecret: string) => {
    // Define and return decrypted object.
    const bytes = AES.decrypt(
        encryptedData,
        encryptionSecret
    );

    return JSON.parse(bytes.toString(enc.Utf8));
};

