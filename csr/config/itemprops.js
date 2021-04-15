module.exports = [
    {
        itemprop: 'API_URL',
        content: `http://${process.env.API_IP ?? 'localhost'}:${process.env.API_PORT ?? 3000}/api`
    },
    {
        itemprop: 'CHAT_URL',
        content: `http://${process.env.CHAT_IP ?? 'localhost'}:${process.env.CHAT_PORT ?? 9123}`
    },
];