module.exports = {    
    WEB_IP: process.env.WEB_IP ?? 'localhost',
    WEB_PORT: process.env.WEB_PORT ?? 3000,
    API_IP: process.env.API_IP ?? 'localhost',
    API_PORT: process.env.API_PORT ?? 3000,
    CHAT_IP: process.env.CHAT_IP ?? 'localhost',
    CHAT_PORT: process.env.CHAT_PORT ?? 9123,
};