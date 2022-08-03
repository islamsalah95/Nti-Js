// const { require } = require("yargs")
const yargs=require("yargs")
const user=require("./controller/user")

//showAll, add, edit, delete
yargs.command({
    command:"add",
    describe:"add new user",
    builder:{
        name:{type:"string", demandOption:true},
        age:{type:"number", demandOption:true},
        status:{type:"string", demandOption:true}
    },
    handler:(argv)=>{
        user.add(argv.name, argv.age, argv.status)
    }
})

yargs.command({
    command:"showAll",
    describe:"show all users",
    handler:()=>{
        user.showAll()
    }
})
yargs.command({
    command:"single",
    describe:"show single user",
    builder:{
        id: { type:"number", demandOption:true}
    },
    handler:(argv)=>{
        user.single(argv.id)
    }
})
yargs.command({
    command:"delete",
    describe:"delete user",
    builder:{
        id:{type:"number", demandOption:true}
    },
    handler:(argv)=>{
        user.del(argv.id)
    }
})
yargs.command({
    command:"edit",
    describe:"add new user",
    builder:{
        id:{type:"number", demandOption:true},
        // newData:{
            name:{type:"string"},
            age:{type:"number"},
            status:{type:"string"}
        // }
    },
    handler:(argv)=>{
        user.edit(argv.id, {name:argv.name, age:argv.age, status:argv.status})
    }
})

yargs.argv