
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
            handleDisconnect,
            handlgetAllusers
          } = makeHandlers(io, client, clientManager, chatroomManager)

        console.log('client connected...', client.id)
        clientManager.addClient(client)

        client.on('join', handleJoin);

        client.on('get-student', handlgetAllusers)

        // socket.on('join', (data) => {

        //     if (typeof classroom === 'object' && classroom[data._id] === undefined)
        //         classroom[data._id] = new Array();

        //     if (messages[data._id] === undefined && typeof messages === 'object')
        //         messages[data._id] = new Array();

        //     socket.join(data._id);
        //     console.log("socket joined!")
        // });

        // socket.on('get-student', async function (data) {
        //     console.log("data :", data);
        //     data.socketId = socket.id;
        //     classroom[data._id].push(data);
        //     io.to(data._id).emit('student-data', classroom[data._id]);
        // })

        // socket.on('send-msg', async function (data) {
        //     messages[data.senderId].push(data);

        //     console.log("messages[data.senderId] :", messages[data.senderId]);
        //     io.to(data.senderId).emit('broadcast-msg', messages[data.senderId]);
        // })

     

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
