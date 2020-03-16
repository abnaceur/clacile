
exports.connectWebSocket = (io) => {
    let messages = {};
    let classroom = {};

    io.on('connection', function (socket) {
        socket.on('join', (data) => {

            if (typeof classroom === 'object' && classroom[data._id] === undefined)
                classroom[data._id] = new Array();

            if (messages[data._id] === undefined && typeof messages === 'object')
                messages[data._id] = new Array();

            socket.join(data._id);
            console.log("socket joined!")
        });

        socket.on('get-student', async function (data) {
            console.log("data :", data);
            data.socketId = socket.id;
            classroom[data._id].push(data);
            io.to(data._id).emit('student-data', classroom[data._id]);
        })

        socket.on('send-msg', async function (data) {
            messages[data.senderId].push(data);

            console.log("messages[data.senderId] :", messages[data.senderId]);
            io.to(data.senderId).emit('broadcast-msg', messages[data.senderId]);
        })

        // socket.on('likeUser', async function (data) {
        //     let userFullname = await user.getUserFullname(data.likerId);
        //     let block = new BlockDao(data.likedId)
        //     data.fullname = userFullname;

        //     if (await block.hasUserNotBeenBlocked(data.likerId, data.likedId)) {
        //         if (notifs[data.likedId] !== undefined) {
        //             notifs[data.likedId].push(data);
        //             io.to(data.likedId).emit('userNotifications', notifs[data.likedId]);
        //         }

        //         if (likesList[data.likedId] !== undefined) {
        //             likesList[data.likedId].push(data);
        //             io.to(data.likedId).emit('userLikesList', notifs[data.likedId]);
        //         }
        //     }

        // })

        // socket.on('new-msg', function (data) {
        //     io.to(data.room).emit('send-new-msg', data.msg);
        // })

        // socket.on('initNotification', function (userId) {
        //     if (notifs[userId] !== undefined) {
        //         notifs[userId] = [];
        //     }

        //     if (likesList[userId] !== undefined) {
        //         likesList[userId] = [];
        //     }
        // })

        // socket.on('initLikesList', function (userId) {
        //     if (likesList[userId] !== undefined) {
        //         likesList[userId] = [];
        //     }
        // })

        socket.on('disconnect', function (data) {
            let keyValue = "";

            let i = 0;

            for (let key in classroom) {
                if (classroom[key][0] !== undefined)
                    classroom[key].forEach(cls => {
                        if (cls.socketId == socket.id)
                            keyValue = key;

                        if (cls.socketId.toString() !== socket.id.toString())
                            classroom[key].splice(i - 1, 1)

                        i++;
                    })
                
                i = 0;
            }

            if (keyValue !== "")
                io.to(keyValue).emit('student-data', classroom[keyValue]);

            setTimeout(() => {
                socket.disconnect(true);
                console.log("socket disconnected!")
            }, 300)
        });

    });
}
