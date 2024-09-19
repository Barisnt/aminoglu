import { Events, Message } from "discord.js"
import Event from "../templates/Event.js"

export default new Event({
    name: Events.MessageCreate,
    once: false,
    async execute(message: Message): Promise<void> {
        if (
            message.content.toLowerCase() === "sa" ||
            message.content.includes("aleyk")
        ) {
            await message.reply("cami mi burası orospu evladı")
        }
    }
})
