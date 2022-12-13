const discord = require('discord.js-selfbot-v13')
const client = new discord.Client({intents: new discord.Intents(32767)})
const quickproxy = require

const Color = require('sync-color')
Color.init()
const consolecolor = Color.InitGradient(["#00ff08", "#91ff00", "#00ff88"])

const request = require('request')

const { guildid, token, url } = require('./config')


if (!token) throw new TypeError("Met ton token user discord")
if (!guildid) throw new TypeError("Met l'id du serveur")
if (!url) throw new TypeError("L'url n'est pas config")
if (url.includes("discord.gg/") || url.includes(".gg/") || url.includes("/")) throw new TypeError("The URL in the config file must not contain 'discord.gg/'")

client.login(token)

client.on('ready', () => {
    console.clear()
    console.log(consolecolor(`SalahSniper`))

})


client.on('ready', () => {



    setInterval(() => {
        const guild = client.guilds.cache.get(guildid)
        if (!guild) throw new TypeError("La guild n'a pas été trouvé...")
        if (guild.vanityURLCode === url){
            console.log(consolecolor("[+] La guild à obtenu l'url demander"))
            process.exit(1)
        }

        const settings = {
            url: `https://discord.com/api/v6/guilds/${guildid}/vanity-url`,
            body: {
              code: url
            },
            json: true,
            method: 'PATCH',
            headers: {
              "Authorization": `Bot ${token}`
            }
          };
    
          request(settings, (err, res, body) => {
            if (err) {
            }
          });     
    }, 1);



})