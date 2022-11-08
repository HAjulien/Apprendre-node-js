import { notAuthenticatedError } from "../errors/notAuthenticatedError.js";

export function verifyUser (req) {
    if (!req.session.get('user')){
        throw new notAuthenticatedError()
    }
}