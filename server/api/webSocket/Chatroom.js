module.exports = function () {
  const members = new Map();
  const messagesList = new Map();

  let chatHistory = []

  function broadcastMessage(message) {
    members.forEach(m => m.emit('message', message))
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

  function addUser(client, userData, chatroomTemplates) {
    chatroomTemplates.map((chroom, idx) => {
      if (chroom._id == userData._id) {
        members.set(client.id, { idx, memberId: chroom.members.length })
        chroom.members.push({
          clientId: client.id,
          _id: userData._id,
          classTitle: userData.classTitle,
          studentName: userData.studentName,
          teacherName: userData.teacherName
        });
      }
    })

    return chatroomTemplates;
  }

  function getUsersByRoomId(roomId) {
    return members.get(roomId);
  }

  function getUserPosition(client) {
    let data = members.get(client.id);
    return data;
  }

  function serialize() {
    return {
      name,
      image,
      numMembers: members.size
    }
  }

  function addMessage(client, msg, chatroomTemplates) {
    chatroomTemplates.map((chroom, idx) => {
      if (chroom._id == msg.id) {
        messagesList.set(client.id, { idx, msgId: chroom.messages.length })
        chroom.messages.push(msg);
      }
    })
    return chatroomTemplates;    
  }

  return {
    addMessage,
    broadcastMessage,
    getUsersByRoomId,
    addEntry,
    getChatHistory,
    addUser,
    getUserPosition,
    serialize
  }
}
