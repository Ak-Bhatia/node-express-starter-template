export function checkadmin(req, res, next) {
    if(!req.isLoggedIn){
        req.isAdmin=false;
        next();
    } else {
        if(req.user.isAdmin){
            req.isAdmin=true;
            next();
        } else {
            req.isAdmin=false;
            next();
        }
    }
}