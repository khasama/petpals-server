// const RoomModel = require("../models/room.model");
// const UserModel = require("../models/user.model");
// const RoleModel = require("../models/role.model");
const SocketService = {};

let rooms = [];

SocketService.init = (socket, io) => {
    let room = {
        id: "",
        master: "",
        video: {},
        playlist: [],
        viewers: [],
    };
    socket.on("join-room", async (roomId, userId) => {

        const user = await getInforUser(userId);
        if (hasRoom(roomId)) {
            addViewer(roomId, user);
            if (Object.keys(getCurrentVideo(roomId)).length !== 0) {
                socket.emit("change-video", getCurrentVideo(roomId));
            }
            socket.emit("update-viewers", getViewers(roomId));
            socket.emit("update-playlist", getPlaylist(roomId));
            socket.to(roomId).emit("user-join-room", user);
        } else {
            const isMaster = await isRealMaster(roomId, userId);
            if (isMaster) {
                RoomModel.update(
                    {
                        live: true
                    },
                    {
                        where: {
                            id: roomId
                        }
                    }
                );
                room.id = roomId;
                room.master = parseInt(userId);
                socket.emit("master");
                socket.emit('user-join-room', user);
                rooms.push(room);
                addViewer(roomId, user);

            } else {
                socket.emit("fuck-off");
            }
        }

        socket.join(roomId);


        socket.on("change-video", (video) => {
            if (checkMaster(roomId, userId)) {
                socket.emit("master-change-video", video);
                socket.to(roomId).emit("change-video", video);
                setCurrentVideo(roomId, video);
            }
        });

        socket.on("add-playlist", (video) => {
            if (checkMaster(roomId, userId)) {
                rooms.map((room) => {
                    if (room.id === roomId) {
                        if (room.playlist.some(e => e.id === video.id)) {
                        } else {
                            room.playlist.push(video);
                            io.to(roomId).emit('add-playlist', video);
                        }
                    }
                });

            }
        });

        socket.on("send-message", (message) => {
            const mess = { message, user };
            io.to(roomId).emit('send-message', mess);
        });

        socket.on("delete-playlist", (video) => {
            if (checkMaster(roomId, userId)) {
                rooms.map((room) => {
                    if (room.id === roomId) {
                        if (room.playlist.some(e => e.id === video.id)) {
                            room.playlist.splice(room.playlist.findIndex(v => v.id === video.id), 1);
                            io.to(roomId).emit('delete-playlist', video);
                        }
                    }
                });

            }
        });

        socket.on("position", (position) => {
            if (checkMaster(roomId, userId)) {
                socket.to(roomId).emit("position", position);
            }
        });

        socket.on("pause", () => {
            socket.to(roomId).emit("pause");
        });

        socket.on("play", () => {
            socket.to(roomId).emit("play");
        });

        socket.on("disconnect", () => {
            if (checkMaster(roomId, userId)) {
                removeViewer(roomId, userId);
                socket.to(roomId).emit("master-disconnect");
                RoomModel.update(
                    {
                        live: false
                    },
                    {
                        where: {
                            id: roomId
                        }
                    }
                );
            } else {
                removeViewer(roomId, userId);
                socket.to(roomId).emit("viewer-disconnect", user);
            }
        });
    });
};

function hasRoom(id) {
    return rooms.findIndex((e) => e.id === id) > -1;
}

function setCurrentVideo(id, video) {
    rooms.map((room) => {
        if (room.id === id) {
            room.video = video;
        }
    });
}

function getCurrentVideo(id) {
    return rooms[rooms.findIndex((e) => e.id === id)].video;
}

function addViewer(id, viewer) {
    rooms.map((room) => {
        if (room.id === id) {
            room.viewers.push(viewer);
        }
    });
}

function getPlaylist(id) {
    return rooms[rooms.findIndex((e) => e.id === id)].playlist;
}

function getViewers(id) {
    return rooms[rooms.findIndex((e) => e.id === id)].viewers;
}

function removeViewer(id, viewer) {
    if (checkMaster(id, viewer)) {
        rooms.splice(
            rooms.findIndex((e) => e.id === id),
            1
        );
    } else {
        rooms.map((room) => {
            if (room.id === id) {
                const newViewer = room.viewers.filter(v => v.id != viewer)
                room.viewers = newViewer;
            }
        });
    }
}

function checkMaster(id, viewer) {
    if (rooms.findIndex((e) => e.id === id) > -1) {
        return rooms[rooms.findIndex((e) => e.id === id)].master === parseInt(viewer);
    }
}

async function isRealMaster(roomId, userId) {
    const room = await RoomModel.findOne({ where: { id: roomId } });
    const master = JSON.parse(JSON.stringify(room)).master;
    return master == parseInt(userId);
}

async function getInforUser(userId) {
    let user = await UserModel.findOne(
        {
            attributes: ['id', 'username', 'email', 'avatar', 'role_id'],
            where: {
                id: userId
            },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        }
    );
    user = JSON.parse(JSON.stringify(user));
    return user;
}

module.exports = SocketService;
