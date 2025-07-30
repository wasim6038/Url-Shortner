// const sessionIdToUserMap = new Map();  // use for statefull auth
const jwt = require('jsonwebtoken') ;  // use for stateless auth
const secret = process.env.JWT_SECRET;

// Use stateless auth
function setUser(user){
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, secret)
};


// // Use statefull auth
// function setUser(id, user){
//     sessionIdToUserMap.set(id, user);
// };

// // Use Statefull auth
// function getUser(id){
//     return sessionIdToUserMap.get(id);
// };

// Use Stateless auth
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    };
};

module.exports = {
    setUser,
    getUser,
}