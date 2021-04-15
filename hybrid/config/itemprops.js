module.exports = [
    {
        itemprop: 'CHAT_URL',
        content: `http://${process.env.CHAT_IP ?? 'localhost'}:${process.env.CHAT_PORT ?? 9123}`
    },
];