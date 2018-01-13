import googleTTS from 'google-tts-api'
// import Player from 'player'
import { error, sleep, json } from '../tools'
const mpv = require('node-mpv');
const mpvPlayer = new mpv();

const answer = async (stream, msg) => {
	googleTTS(msg, 'fr',1).then(url => mpvPlayer.load(url))
	// await googleTTS(msg, 'fr', 1)
	// 	.then(url => stream.url = url )
	// 	.catch(err => error(__filename, 'answer', err.stack) )


	// const player = await new Player([stream.url])
    //
	// player.play(function(err, player){
	//   console.log('playend!');
	// })

	// .enable('stream')
	// .on('downloading', function(song) {
	// 	console.log('im downloading... ')
	// 	console.log(song)
	// })
	// .on('playing', async function(song) {
	// 	console.log('im playing... ')
	// 	console.log(song)
	// })
	// .on('playend', function(song) {
	// 	console.log('play done, switching to next one ...')
	// })
	// .on('error', function(err) {
	// 	console.log('Opps...!')
	// 	error(__filename, 'answer', err.toString())
	// 	console.log(err)
	// })
	// .play()

}

module.exports = {
	answer,
}
