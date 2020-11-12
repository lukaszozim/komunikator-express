const Sequelize = require("sequelize");
const conversations = require('../models/conversations');


    module.exports = {
        getConversations : function(){
            return conversations.findAll();
        }

    }

        
