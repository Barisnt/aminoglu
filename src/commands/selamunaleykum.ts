import { SlashCommandBuilder } from "discord.js"
import ApplicationCommand from "../templates/ApplicationCommand.js"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("selamunaleykum")
        .setDescription("as"),
    async execute(interaction): Promise<void> {
        await interaction.reply("Cami mi burası orospu evladı")
    }
})
