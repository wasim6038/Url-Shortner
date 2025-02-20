const { getUser } = require('../service/auth');

// async function restrictToLoginUserOnly(req, res, next){
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization'];

//     if(!userUid) return res.redirect('/login');
//     const token = userUid.split('Bearer ')[1];
//     const user = getUser(token);

//     // const user = getUser(userUid);
//     if(!user) return res.redirect('/login');

//     req.user = user;
//     next();
// };

// async function checkAuth(req, res, next){
//     // const userUid = req.cookies?.uid;
//     console.log(req.headers);
//     const userUid = req.headers['authorization'];
//     if (!userUid || !userUid.startsWith('Bearer ')) {
//         console.log('Missing or malformed Authorization header');
//         return res.redirect('/login');
//     }
//     const token = userUid.split('Bearer ')[1];
//     const user = getUser(token);
    
//     // const user = getUser(userUid);

//     req.user = user;
//     next();
// };


function checkForAuthentication(req, res, next){     // Authentication
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie) return next();

    const token = tokenCookie;
    const user = getUser(token);

    req.user = user;
    return next();
};

// Authorization
function restrictTo( roles = []) {
    return function(req, res, next) {
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end('UnAuthorized');

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo,
}