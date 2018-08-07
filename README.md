# Sync Last.fm tracks to your Slack status
🎶 Update your Slack status with your currently playing Last.fm track

I liked [a version of this that used Spotify](https://glitch.com/edit/#!/harmonious-shoemaker) but wanted a version that uses Last.fm.

Last.fm in theory works with any music source not just Spotify but still has [good integrations with Spotify](https://support.spotify.com/is/using_spotify/app_integrations/scrobble-to-last-fm/).

[The Last.fm API](https://www.last.fm/api) is a lot easier to use than Spotify too as you just need a API key and don't need to worry about OAuth.

## Screenshots

'none' theme
!['none' theme screenshot](https://cdn.glitch.com/01be6f03-5472-446b-a3ef-e7b33f248ca5%2FScreenshot%20from%202018-08-07%2001-16-19.png?1533601068794)

'lastfm' theme
!['lastfm' theme screenshot](https://cdn.glitch.com/01be6f03-5472-446b-a3ef-e7b33f248ca5%2FScreenshot%20from%202018-08-07%2001-18-55.png?1533601155887)


## Installation
1. [Remix this app 🎤](https://glitch.com/edit/#!/remix/lastfm-slack-status-sync)
2. Add Slack emojis from assets

> In the assets section there are Last.fm and Scrobble icons. [Add the to Slack](https://slack.com/customize/emoji) with the names `lastfm` and `lastfm-scrobbling`.

> ![Last.fm icon](https://cdn.glitch.com/01be6f03-5472-446b-a3ef-e7b33f248ca5%2Flastfm.png?1533599677270)
> ![Scrobble GIF](https://cdn.glitch.com/01be6f03-5472-446b-a3ef-e7b33f248ca5%2Fscrobble.gif?1533599699547)

3. [Get Last.fm API key and secret](https://www.last.fm/api/account/create)

> Add API key and secret environment variables to `.env`

4. [Create a Slack app](https://api.slack.com/apps/) with `user.profile:write` scope permissions.
> Add the app to your workspace and copy the full `xoxp-xxx-xxx` token to `.env`

5. We'll use [Uptime Robot](https://uptimerobot.com) to poll the Glitch app every minute to update the status.
> Create an account on Uptime Robot
> Set the `BOT_ENDPOINT` variable to something secret
> For example if BOT_ENDPOINT is 'runescape' your URL could be `https://lastfm-slack-status-sync.glitch.me/sync-runescape`
> Update Uptime Robot accordingly

6. Set a `THEME` variable to 'lastfm' for Last.fm theme or 'none' for emojis (See screenshots)