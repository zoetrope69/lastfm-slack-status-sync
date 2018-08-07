const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env
if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
  console.error('Missing Last.fm environment variables. Please read the README.md')
  process.exit(1)
}

const fetch = require('node-fetch')
const queryString = require('qs')


function lastfm (method, options) {
  const LASTFM_API_BASE = 'https://ws.audioscrobbler.com/2.0/'
  
  const allOptions = Object.assign({
    method,
    api_key: LASTFM_API_KEY,
    format: 'json'
  }, options)
  const optionsQueryString = queryString.stringify(allOptions)
  
  const url = `${LASTFM_API_BASE}?${optionsQueryString}`
  
  return fetch(url).then(response => response.json())
}

function getRecentTracks () {
  return lastfm('user.getrecenttracks', { user: LASTFM_USERNAME })
    .then(data => data.recenttracks.track)
    .then(tracks => {
      return tracks.map((track, i) => {
        const trackData = {
          artist: track.artist['#text'],
          name: track.name
        }
        
        if (track['@attr'] && track['@attr'].nowplaying) {
          trackData.nowPlaying = true
        }
        
        return trackData
      })
    })
}

function getMostRecentTrack () {
  return getRecentTracks().then(tracks => {
    const mostRecentTrack = tracks[0]  
    console.info(new Date(), `Most recent track: ${JSON.stringify(mostRecentTrack)}`)
    return mostRecentTrack
  })
}

module.exports = {
  getMostRecentTrack
}
