const express = require('express');
const authRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils")

const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { teacher } = require('./client');
const SALT_COUNT = 10;

//<--------------------------------LOGIN USERS-------------------------------->
//POST /auth/login
authRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const teacher = await prisma.teacher.findUnique({
            where: { username: username },
        });
        const validPassword = await bcrypt.compare(
            password,
            teacher?.password ?? ""
        );
        //Check user and password
        if (!teacher) {
            return res.status(401).send("There is no teacher with that username.");
        } else if ( !validPassword) {
            return res.status(401).send("Incorrect password.");
        }

        //Create token
        const token = jwt.sign({ id: teacher.id }, process.env.JWT_SECRET);
        res.send({ token });
        console.log("Login successful!");
    } catch (error) {
        next(error);
    }
})

//<--------------------------------GET ALL USERS-------------------------------->
//ADMIN ONLY
//GET /auth/users
authRouter.get("/teachers",[requireUser, requireAdmin], async (req, res, next) => {
    try {
        const teacher = prisma.teacher
        const teachers = await teacher.findMany();

        delete teachers.password
        res.send(teachers);
    } catch (error) {
        next(error);
    }
});

module.exports = authRouter;
