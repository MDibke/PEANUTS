""""
Copyright © Krypton 2019-2023 - https://github.com/kkrypt0nn (https://krypton.ninja)
Description:
🐍 A simple template to start to code your own and personalized discord bot in Python programming language.

Version: 6.1.0
"""
import discord
from discord import app_commands
from discord.ext import commands
from discord.ext.commands import Context


# Here we name the cog and create a new class for the cog.
class Meal(commands.Cog, name="meal"):
    def __init__(self, bot) -> None:
        self.bot = bot

    @commands.hybrid_command(
        name="mealgenerator",
        description="Choose a meal for you",
    )
    async def meal_generator(self, context: Context) -> None:
        await context.send('Choix du repas :')


# And then we finally add the cog to the bot so that it can load, unload, reload and use it's content.
async def setup(bot) -> None:
    await bot.add_cog(Meal(bot))
