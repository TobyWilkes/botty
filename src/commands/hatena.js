'use strict';
const Command = require('../structures/Command');

//Searching japanese-english dictionary
module.exports = function command(requires)
{
  return new Command({
    name: 'Hatena',
    inline: false,
    alias: ['h'],
    description: '[<word>] Looks up a word from Hatenas knowledgebase. Not always dictionary definitions.',
    permission: 'public',
    action: function(details)
    {
      let bot = requires.bot;
      let info = requires.info;
      let jisho = info.utility.useSource('hatenaAPI');

      const searchHatena = function(w,n)
      {
        jisho.searchHatena(w,n).then((emb) =>
        {
          bot.sendMessage(details.channelID, {
            embed: emb,
          }); 
        }).catch((err) =>
        {
          bot.sendMessage(details.channelID, {
            embed: {
              title: 'Error',
              description: err
            }
          });
        });
      };/*
      const listJisho = function(w)
      {
        jisho.listJisho(w, details.isDirectMessage).then((data) =>
        {
          if(data.shouldDM)
          {
            bot.sendMessage(details.channelID, {
              embed: {
                title: 'Too Many Results',
                description: 'There were more than 10 results, sent results via DM.'
              }
            });
            bot.sendMessage(details.userID, {
              embed: data.embed
            });
          }
          else
          {
            bot.sendMessage(details.channelID, {
              embed: data.embed
            });
          }
        }).catch((err) =>
        {
          bot.sendMessage(details.channelID, {
            embed: {
              title: 'Error',
              description: err
            }
          });
        });
      };*/
      //processes the command
      //to better understand this part, take a look at the parameters at the top of the page
      if(details.input === '') {return;}
      else if(details.input.search(/.+\s(--list)/g) != -1)
      {
        //listJisho(details.input.replace(' --list', ''));
        return;
      }
      else if(details.input.search(/^.+\s[1-9][0-9]*$/g) != -1)
      {
        let patt = /[1-9][0-9]*$/g;
        let num = parseInt(patt.exec(details.input),10);
        console.log('Num is ' + num + ' details is ' + details.input);
        console.log('Searching for ' + details.input.replace(/\s[1-9][0-9]*/g, ''));
        searchJisho(details.input.replace(/\s[1-9][0-9]*/g, ''),num - 1);
        return;
      }
      else
      {
        searchHatena(details.input, 0);
        return;
      }
    }
  }, requires);
};
