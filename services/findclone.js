
const request = require("request");

module.exports.url = 'https://findclone.ru/register?phone=+${number}';

module.exports.run = function(number){
	if(number.toString()){
		request.get({
			url:`https://findclone.ru/register?phone=+${number}`
		}, 
			function(err, res, json) {
				/**/
		})
	}
}