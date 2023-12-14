const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ Error: "You are not authenticated" });
    } else {
        const tokenParts = token.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
            return res.status(401).json({ Error: "Invalid token format" });
        }
        
        const tokenValue = tokenParts[1];
        
        jwt.verify(tokenValue, "jwt-secret-key", (err, decoded) => {
            if (err) {
                console.error("Token verification error:", err);
                return res.status(401).json({ Error: "Invalid token" });
            }
            
            req.role = decoded.role;
            req.id = decoded.id;
            req.email = decoded.email;
            
            next();
        });
    }
};

module.exports = verifyUser;
