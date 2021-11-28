import jwt from "jsonwebtoken";

export function verifyLoggedIn(request, response, next) {
    console.log('VERIFYLOGGGED-IN', request.headers.authorization);
    if (!request.headers.authorization){
        console.log('im INSIDE ERROR', request.headers.authorization);
    return response.status(401).send("You are not logged-in.");
   } // Get token
    const token = request.headers.authorization.split(" ")[1];
    if (!token) return response.status(401).send("You are not logged-in.");
    // jwt.verify(token, config.jwtKey, err => {
    jwt.verify(token, "aosdkasokdaoskdokadsok", (err, decodedToken) => {
        if (err) {
            if (err.message === "jwt expired")
                return response.status(403).send("Your login session has expired.");
            return response.status(401).send("You are not logged-in.");
        }
        else {
            request.user = decodedToken.user;
            next();
        }
    });
}

