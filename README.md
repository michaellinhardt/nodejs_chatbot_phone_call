# Dolores Demo Refactored

After cloning you need to :

- `brew install sox` so you can record your voice
- `npm install`
- `cp config/token_rename.js config/token.js`
- Add the recast key to config/token.js
- Ask someone of the team for the Google Speech API key file and put it in config
- `export GOOGLE_APPLICATION_CREDENTIALS=${PWD}/config/THE_FILE_NAME`

# Phone version:
- Put the file private.key in the root folder "/" of your project
- `npm install -g nexmo-cli`
- `nexmo setup <api-key> <api-secret>`
- `ngork http 8000` -> Get the Forwarding address
- `nexmo app:update 0b35c0ac-e08b-4481-8df5-6c4764a522c2 'Callcenter' [ngrok address]/ncco [ngrok address]/events`
- `npm run phone`




# Refactore
- `npm reinstall`
- `mkdir log`
