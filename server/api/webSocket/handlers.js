
module.exports = function (io, client, clientManager, chatroomManager) {

  function handleJoin(data) {
    client.join(data._id);
    chatroomManager.joinChatroom(client, data);

    let messages = chatroomManager.getMsgByChatroom(client);

    if (messages.length > 0)
      io.to(data._id).emit('broadcast-msg', messages);
  
    }

  function handleDisconnect() {
    clientManager.removeClient(client);
    chatroomManager.removeMember(client);
    let members = chatroomManager.getMemberByChatroom(client);

    console.log("members updated:", members.length);
    if (members.length > 0)
      io.to(members[0]._id).emit('student-data', members);
  }

  function handlgetAllusers(userData) {
    let members = chatroomManager.getMemberByChatroom(client)
    io.to(userData._id).emit('student-data', members);
  }

  function handlSentMsg(msg) {
    console.log("Message :", msg);
    chatroomManager.addMsgChatroom(client, msg);
    let messages = chatroomManager.getMsgByChatroom(client);

    io.to(msg.id).emit('broadcast-msg', messages);
  }

  return {
    handleJoin,
    handlSentMsg,
    handlgetAllusers,
    handleDisconnect,
  }
}
