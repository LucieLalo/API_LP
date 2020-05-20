export const config = {
    envName: process.env.NODE_ENV,
    project: {
        name: process.env.PROJECT_NAME,
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL,
        port: process.env.API_PORT
    },
    mongo: {
        path: process.env.MONGO_PATH,
        name: process.env.MONGO_NAME,
        debug: process.env.MONGO_DEBUG
    },
    cors: {
        allowedOrigin: process.env.ALLOWED_ORIGIN
            ? process.env.ALLOWED_ORIGIN.split(",")
            : []
    },
    secret: {
        jwt: process.env.JWT_SECRET,
        crypto: process.env.CRYPTO_SECRET
    }
};