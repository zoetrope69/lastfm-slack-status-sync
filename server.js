const { BOT_ENDPOINT, THEME } = process.env
if (!BOT_ENDPOINT || !THEME) {
  console.error('Missing environment variables. Please read the README.md')
  process.exit(1)
}

const express = require('express')
const app = express()

const lastfm = require('./src/lastfm')
const slack = require('./src/slack')

function getStatusEmoji () {
  if (THEME === 'lastfm') return 'lastfm'
  return 'notes'
}

function getPlayingText () {
  if (THEME === 'lastfm') return 'Scrobbling now'
  return 'Playing now'
}

function formatMostRecentTrack (mostRecentTrack) {
  const { name, artist, nowPlaying } = mostRecentTrack
  
  let statusText = `${name} — ${artist}`
  
  if (nowPlaying) {
    const playingText = getPlayingText()
    statusText += ` :lastfm-scrobbling: ${playingText}`
  }
  
  return statusText
}

function syncLastmSlackStatus () {
  return lastfm.getMostRecentTrack()
    .then(mostRecentTrack => {
      const statusText = formatMostRecentTrack(mostRecentTrack)
      const statusEmoji = getStatusEmoji()
      return slack.setStatus(statusText, statusEmoji)
    })
}

app.get('/', (request, response) => {
  response.sendStatus(200) // don't do anything just respond with a 200 (OK)
})

app.get(`/sync-${BOT_ENDPOINT}`, (request, response) => {
  syncLastmSlackStatus()
    .then(() => {
      response.sendStatus(200)
    })
    .catch(error => {
      console.error(error.stack)
      response.status(500).send('Something broke!')
    })
})

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
   