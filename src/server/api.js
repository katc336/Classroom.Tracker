const express = require('express');
const apiRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");

module.exports = apiRouter;