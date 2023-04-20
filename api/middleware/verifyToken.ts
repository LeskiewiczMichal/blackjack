// export const verifyToken = (req, res, next) => {
//     // Get header value
//     const bearerHeader = req.headers["authorization"];

//     // Check if bearer is undefined
//     if (typeof bearerHeader !== "undefined") {
//         const bearer = bearerHeader.split(" ");
//         // Get token from array
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;

//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }