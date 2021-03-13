module.exports = class Connection {
    constructor(user, socket, chatmessages) {
        this.user = user ?? null;
        this.socket = socket ?? null;
        this.chatmessages = chatmessages ?? [];
    }


    compareTo(connection) {
        return this.user._id.toString() === connection.user._id.toString();
    }
}