const Chatroom = require('./Chatroom')
const classDao = require('../daos/ClassroomDao');

let chatroom = new Chatroom();
let chatroomTemplates = [];

async function getRomms() {
  chatroomTemplates = await classDao.getAllclassrooms()
};

module.exports = function () {
  // mapping of all available chatrooms
  getRomms();
  
  function joinChatroom(client, userData) {
    chatroomTemplates = chatroom.addUser(client, userData, chatroomTemplates);
  }

  function removeMember(client) {
    let data = chatroom.getUserPosition(client);

    if (data !== undefined && chatroomTemplates[data.idx] !== undefined)
      chatroomTemplates[data.idx].members.splice(data.memberId, 1)
  }


  function getMemberByChatroom(client, userData) {
    let data = chatroom.getUserPosition(client);
    if (data !== undefined && chatroomTemplates[data.idx] !== undefined)
      return chatroomTemplates[data.idx].members;
    return [];
  }

  return {
    removeMember,
    getMemberByChatroom,
    joinChatroom,
  }
}
