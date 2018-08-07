const { SLACK_ACCESS_TOKEN } = process.env
if (!SLACK_ACCESS_TOKEN) {
  console.error('Missing Slack environment variables. Please read the README.md')
  process.exit(1)
}

const { WebClient } = require('@slack/client')

const slack = new WebClient(SLACK_ACCESS_TOKEN)

function setStatus (text, emoji) {
  const profileData = { status_text: text, status_emoji: `:${emoji}:` }
  console.info(new Date(), `Set Slack status to "${profileData.status_text}" with a emoji of "${profileData.status_emoji}"`)
  return slack.users.profile.set({ profile: profileData })
}

module.exports = {
  setStatus
}
   