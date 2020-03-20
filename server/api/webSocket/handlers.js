
module.exports = function (io, client, clientManager, chatroomManager) {

  function handleJoin(data) {
    client.join(data._id);
    chatroomManager.joinChatroom(client, data);

    let messages = chatroomManager.getMsgByChatroom(client);

    if (messages.length > 0)
      io.to(data._id).emit('broadcast-msg', messages);
  }

  function handlgetMemberByRomm(data) {
    client.join(data._id);
    let members = chatroomManager.ifNameExist(data);
    client.emit('memeber-exist', members);
  }

  function handleDisconnect() {
    clientManager.removeClient(client);
    chatroomManager.removeMember(client);
    let members = [];
    members = chatroomManager.getMemberByChatroom(client);

    console.log("Members :", members.length);
    members = members == undefined ? [] : members;
    if (members.length > 0)
      io.to(members[0]._id).emit('student-data', members);
  }

  function handlgetAllusers(userData) {
    let members = chatroomManager.getMemberByChatroom(client)
    io.to(userData._id).emit('student-data', members);
  }

  function handlSentMsg(msg) {
    chatroomManager.addMsgChatroom(client, msg);
    let messages = chatroomManager.getMsgByChatroom(client);

    io.to(msg.id).emit('broadcast-msg', messages);
  }

  function handlStartStream(data) {
    console.log("Data ===> ", data);

  }

  return {
    handleJoin,
    handlSentMsg,
    handlgetAllusers,
    handlStartStream,
    handlgetMemberByRomm,
    handleDisconnect,
  }
}
