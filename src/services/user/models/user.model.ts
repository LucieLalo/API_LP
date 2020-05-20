import { genSalt, hash, compare } from 'bcrypt';
import { Model, Schema, Document, model, Error } from 'mongoose';

class User {
    _id?: string;
    created?: string;
    pseudo: string;
    email: string;
    password?: string;

    constructor(user: User) {

        if (!user.pseudo || !user.email) {
            throw new Error("Invalid User!");
        }
        this.created = user.created;
        this.pseudo = user.pseudo;
        this.email = user.email;
        if (user._id) {
            this._id = user._id;
        }

        if (user.password) {
            this.password = user.password;
        }
    }
}

export type UserDocument = Document & {
    _id: string;
    created: string;
    pseudo: string;
    email: string;
    password: string;
    comparePassword: comparePasswordFunction;
}


const UserSchema = new Schema({
    created: { type: Date, required: false, default: Date.now },
    updated: { type: Date, required: false, default: Date.now },
    pseudo: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre<UserDocument>('save', function (next) {
    let user = this;


    if (this.isModified('password') || this.isNew) {
        genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;
const comparePassword: comparePasswordFunction = function (this: UserDocument, candidatePassword) {
    return compare(candidatePassword, this.password);
};
UserSchema.methods.comparePassword = comparePassword;

const UserModel: Model<UserDocument> = model<UserDocument>("users", UserSchema);

export { User, UserModel }