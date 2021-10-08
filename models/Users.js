// guardar usuario OK
//buscar usuario email OK
//buscar usuario por id OK
//editar info de usuario
//eliminar usuario OK
const fs=require("fs")

const User ={
    fileName:"./data/users.json",

    generateId:function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id +1;
        }
        return 1
    },
    
    getData:function(){
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    findAll:function(){
        return this.getData()
    },

    findByPk:function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user=>user.id===id);
        return userFound
    },

    findByField:function(field,text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(user=>user[field]===text);
        return userFound
    },



    create:function(userdata){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userdata
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName,JSON.stringify(allUsers,null," "));
        return newUser
    },

    delete:function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(user=>user.id!==id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null," "));
        return true
    }


}

module.exports = User
