
module.exports = function (io, client, clientManager, chatroomManager) {

  function handleJoin(data) {
    client.join(data._id);
    chatroomManager.joinChatroom(client, data);
    return data
  }

  function handleDisconnect() {
    clientManager.removeClient(client);
    chatroomManager.removeMember(client);
    let members = chatroomManager.getMemberByChatroom(client);
   if (members.length > 0)
      io.to(members[0]._id).emit('student-data', members);
  }

  function handlgetAllusers(userData) {
    let members = chatroomManager.getMemberByChatroom(client)
    io.to(userData._id).emit('student-data', members);
  }

  return {
    handleJoin,
    handlgetAllusers,
    handleDisconnect,
  }
}
