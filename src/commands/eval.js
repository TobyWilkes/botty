'use strict';
const Command = require('../structures/Command');

//Evaluates arbitrary javascript
module.exports = function command(requires)
{
  return new Command({
    inline: true,
    alias: ['ev'],
    description: 'Evaluates JS code',
    permission: 'private',
    action: function(details)
    {
      let bot = requires.bot;
      
      const echo = function(str)
      {
        bot.sendMessage(details.channelID, {
          message: str
        });
      };
      if(details.input === '') {return;}
      else
      {
        try
        {
          bot.sendMessage(details.channelID, {
            message: eval(details.input)
          });
        }
        catch(err)
        {
          bot.sendMessage(details.channelID, {
            message: err
          });
        }
      }
    }
  }, requires);
};
