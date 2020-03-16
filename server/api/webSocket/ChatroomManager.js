const Chatroom = require('./Chatroom')
const classDao = require('../daos/ClassroomDao');

let chatroom = new Chatroom();
let chatroomTemplates = [];
let chatroomCheckTemplates = [];

async function getRomms() {
  chatroomTemplates = await classDao.getAllclassrooms()
};

async function getCheckRomms() {
  chatroomCheckTemplates = await classDao.getAllclassrooms()
};

module.exports = function () {
  // mapping of all available chatrooms
  getRomms();

  function joinChatroom(client, userData) {
    // Update chatrooms if true
    getCheckRomms();
    if (chatroomCheckTemplates.length > chatroomTemplates.length) {
      chatroomTemplates = chatroomCheckTemplates
    };

    chatroomTemplates = chatroom.addUser(client, userData, chatroomTemplates);
  }

  function addMsgChatroom(client, msg) {
    chatroomTemplates = chatroom.addMessage(client, msg, chatroomTemplates);
  }


  function removeMember(client) {
    let data = chatroom.getUserPosition(client);

    if (data !== undefined && chatroomTemplates[data.idx] !== undefined)
      chatroomTemplates[data.idx].members.splice(data.memberId, 1)
  }


  function getMemberByChatroom(client) {
    let data = chatroom.getUserPosition(client);
    if (data !== undefined && chatroomTemplates[data.idx] !== undefined)
      return chatroomTemplates[data.idx].members;
    return [];
  }

  function getMsgByChatroom(client) {
    let data = chatroom.getUserPosition(client);
    if (data !== undefined && chatroomTemplates[data.idx] !== undefined)
      return chatroomTemplates[data.idx].messages;
    return [];
  }

  function ifNameExist(data) {
    let members = [];
    chatroomTemplates.map(chat => {
      if (data._id == chat._id) {
        members = chat.members
      }
    });

    return members;
  }

  return {
    removeMember,
    getMsgByChatroom,
    addMsgChatroom,
    ifNameExist,
    getMemberByChatroom,
    joinChatroom,
    getCheckRomms
  }
}
