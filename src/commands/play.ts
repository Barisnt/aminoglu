/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SlashCommandBuilder } from "discord.js"
import ApplicationCommand from "../templates/ApplicationCommand.js"
import { useMainPlayer } from "discord-player"

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName("play")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("Phrase to search for")
                .setAutocomplete(false)
                .setRequired(true)
        )
        .setDescription("play from yt"),
    async execute(interaction: any): Promise<void> {
        const player = useMainPlayer()

        const channel = interaction.member?.voice.channel // get the voice channel of the member
        if (!channel)
            await interaction.reply("You are not connected to a voice channel!") // make sure we have a voice channel
        const query = interaction.options.getString("query", true) // we need input/query to play

        // let's defer the interaction as things can take time to process
        await interaction.deferReply()

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            })

            await interaction.followUp(`**${track.cleanTitle}** enqueued!`)
        } catch (e) {
            // let's return error if something failed
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            await interaction.followUp(`Something went wrong: ${e}`)
        }
    }
})
