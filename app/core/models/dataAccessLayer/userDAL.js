// const User = require('../dataModels/user/userModel');
const {User} = require('../../db/models');

class UserDAL{
    
    signup(param){
        console.log(param);
        return User.create(param);
    }

    getUser(param){
        return User.findOne({where : param});
    }

    getAllUser(){
        return User.findAll();
    }

    updatePassword(user, newPassword){
       return user.update({
            password: newPassword
        });
    }

    pushTokens(ids){
        if (!ids || ids.length == 0){
            
            return User.findAll({
                attributes: ['pushToken']
        });
        }else{
            return User.findAll({where:{
                id: ids
            },
            attributes: ['pushToken']
        });
        }
    }
}

module.exports = new UserDAL();