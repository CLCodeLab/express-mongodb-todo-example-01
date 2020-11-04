const moment = require('moment')

const logger = (request, response, next) => {
	const protocol = request.protocol
	const host = request.get('host')
	const originalUrl = request.originalUrl
	const currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")

	console.log(`Request sent via" ${protocol}://${host}${originalUrl}", on: ${currentDate}`)

	next()
}

module.exports = logger