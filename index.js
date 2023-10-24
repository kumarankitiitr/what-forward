const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});


let toContact;
let fromContact;

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        //console.log(chats)
        toContact = chats.find(
            (chat) => chat.name === "Test 2"
        );
        fromContact = chats.find(
            (chat) => chat.name === "test"
        );
        client.sendMessage(toContact.id._serialized, "Hii THis is automated message");
    })
});

client.initialize();

client.on('message', (message) => {
    console.log(message);
    if (message.from === fromContact.id._serialized) {
        var nme = '*' + (message._data.notifyName) + '\n' + (message.author).slice(0, 12) + '*';
        console.log(nme);
        var msg = nme + '\n' + message.body;
        client.sendMessage(toContact.id._serialized, msg);
    }
})

