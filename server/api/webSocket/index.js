
exports.connectWebSocket = (io) => {
    let messages = {};
    let classroom = {};

    const ClientManager = require('./ClientManager')
    const ChatroomManager = require('./ChatroomManager')
    const makeHandlers = require('./handlers')

    const clientManager = ClientManager()
    const chatroomManager = ChatroomManager()

    io.on('connection', function (client) {

        const {
            handleJoin,
            handlSentMsg,
            handleDisconnect,
            handlgetMemberByRomm,
            handlgetAllusers
          } = makeHandlers(io, client, clientManager, chatroomManager)

        console.log('client connected...', client.id)
        clientManager.addClient(client)

        client.on('join', handleJoin);

        client.on('get-student', handlgetAllusers);

        client.on('send-msg', handlSentMsg);

        client.on('get-memebers', handlgetMemberByRomm);

        client.on('disconnect', function () {
            console.log('client disconnect...', client.id)
            handleDisconnect()
        })

        client.on('error', function (err) {
            console.log('received error from client:', client.id)
            console.log(err)
        })

    });
}
