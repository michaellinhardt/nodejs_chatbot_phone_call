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




# Install Dolores
- Copy the ./private folder from gdrive /root/doc & tuto/token/
- Past the ./private folder here
- `npm reinstall`
- `mkdir log`

# Mysql install and setup
- `brew install mysql`
- `mysql.server start`
- `mysql_secure_installation`
- Follow mysql instructions to make a secure install
- `mysql_config_editor set --login-path=local --host=localhost --user=username --password`
- Enter your root password then to connect use this command:
- `mysql --login-path=local`
- With this method you dont have to type password in shell command line
- `create database dolores;`

# Mysql command
- `show databases;`
- Display database
- `use dolores`
- Select the database 'dolores'
- `exit`
- Disconnect

# About Mysql Security
- As Sequelize recommends we are using an operatorsAliases object to protect our code from json injection. But actually this object is empty and we should implement it later for security purpose
