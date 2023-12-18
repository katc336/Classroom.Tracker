const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-------------AUTHORIZATION MIDDLEWARE------------->
const authMiddleware = async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await prisma.user.findUnique({
                    where: { id }
                });
                next();
            }
        } catch (error) {
            next(error.message);
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`,
        });
    }
};

const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).send("Sorry, you need an account to do that.")
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (req.user?.isAdmin === true) {
        next();
    } else {
        res.status(401).send("Sorry, you are not an admin.")
    }
};

module.exports = {
    requireUser,
    requireAdmin,
    authMiddleware
}