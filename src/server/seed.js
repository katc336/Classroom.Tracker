const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

let adminPass = "";
let teacherPass = "";

async function hashedAdminPassword() {
    adminPass = bcrypt.hashSync("De$ignCentra1", SALT_COUNT);
    teacherPass = bcrypt.hashSync("singSongTheBard", SALT_COUNT);
    return (adminPass, teacherPass);
}
hashedAdminPassword();

async function seed() {
    await prisma.lesson.deleteMany();
    await prisma.student.deleteMany();
    await prisma.class.deleteMany();
    await prisma.teacher.deleteMany();

    console.log("Seeding the database.");

    try {
        //<-------------------TEACHER DATA------------------->
        const teacher1 = await prisma.teacher.create({
            data: {
                username: "maomi",
                firstName: "Kat",
                lastName: "C",
                email: "katc@email.com",
                password: "De$ignCentra1",
                isAdmin: true
            }
        });
        const teacher2 = await prisma.teacher.create({
            data: {
                username: "faz",
                firstName: "Faron",
                lastName: "S",
                email: "farons@email.com",
                password: "singSongTheBard"
            }
        });
        //<-------------------CLASS DATA------------------->
        //Art class grade 7
        const class1 = await prisma.class.create({
            data: {
                name: "Art7",
                teacher: { connect: { id: teacher1.id } }
            },
            include: { teacher: true }
        });
        //Art class grade 8
        const class2 = await prisma.class.create({
            data: {
                name: "Art8",
                teacher: { connect: { id: teacher1.id } }
            },
            include: { teacher: true }
        });
        //Beginner level piano
        const class3 = await prisma.class.create({
            data: {
                name: "Paino Beginner",
                teacher: { connect: { id: teacher2.id } }
            },
            include: { teacher: true }
        });
        //Intermediate level piano
        const class4 = await prisma.class.create({
            data: {
                name: "Paino Intermediate",
                teacher: { connect: { id: teacher2.id } }
            },
            include: { teacher: true }
        });
        //<-------------------STUDNET DATA------------------->
        //Art 7 students
        const student1 = await prisma.student.create({
            data: {
                firstName: "Hayden",
                lastName: "Cole",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student2 = await prisma.student.create({
            data: {
                firstName: "Lauryn",
                lastName: "Robinson",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student3 = await prisma.student.create({
            data: {
                firstName: "Juan",
                lastName: "Rodriguez",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student4 = await prisma.student.create({
            data: {
                firstName: "Jayden",
                lastName: "Cheng",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student5 = await prisma.student.create({
            data: {
                firstName: "Catlynne",
                lastName: "Armstrong",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        // const student6 = await prisma.student.create({
        //     data: {
        //         firstName: "Calvin",
        //         lastName: "Haynes",
        //         class: { connect: { id: class1.id } }
        //     },
        //     include: { class: true }
        // })
        const student7 = await prisma.student.create({
            data: {
                firstName: "Kailin",
                lastName: "Lue",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student8 = await prisma.student.create({
            data: {
                firstName: "Jenny",
                lastName: "Wright",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student9 = await prisma.student.create({
            data: {
                firstName: "Charlie",
                lastName: "Spencer",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student10 = await prisma.student.create({
            data: {
                firstName: "John",
                lastName: "Dickson",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        const student11 = await prisma.student.create({
            data: {
                firstName: "Maria",
                lastName: "Reyes",
                class: { connect: { id: class1.id } }
            },
            include: { class: true }
        })
        //<-------------------LESSON DATA------------------->
        //Lessons for Art 7
        const lesson1 = await prisma.lesson.create({
            data: {
                learningObjective: "Identify a variety of forms of art and design",
                progress: 90,
                class: { connect: { id: class1.id } },
                students: {
                    create: {
                        data: {
                            firstName: "Calvin",
                            lastName: "Haynes",
                            class: { connect: { id: class1.id } }
                        },
                        include: { firstName: true }
                    },
                },
            },
            include: { class: true }
        })
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