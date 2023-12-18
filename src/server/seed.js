const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

let adminPass = "";

async function hashedAdminPassword() {
    adminPass = bcrypt.hashSync("De$ignCentra1", SALT_COUNT);
    return (adminPass);
}
hashedAdminPassword();

async function seed() {
    console.log("Seeding the database.");
  

    try {


    } catch (error) {
        console.log(error)
    }
    console.log("Seeded!")
}
seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})