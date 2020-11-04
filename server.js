const express = require('express')
const mongodb = require('mongodb')
const dotenv = require('dotenv').config()
const sanitizeHTML = require('sanitize-html')
/*
TITLE: CONSTANTS (CONFIGS/ENV VARS)*/
const PORT = process.env.PORT || 5000
const CONNECTIONSTRING = process.env.CONNECTIONSTRING
/*
TITLE: INITIATE EXPRESS */
const server = express()
/*
TITLE: INITIATE CONNECTION TO DATABASE
NOTE: CONNECT TO DATABASE
NOTE: LISTEN TO PORT*/
let database
mongodb.connect(
	CONNECTIONSTRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error, client) => {
		database = client.db()
		server.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`)
		})
	}
)
/*
TITLE: SERVER UTILITIES
NOTE: BODY PARSER MIDDLEWARE TO HANDLE RAW JSON AND URL ENCODED DATA*/
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
/*
TITLE: GET ACCESS TO 'PUBLIC' FOLDER FOR STATIC FILES */
server.use(express.static('public'))
/*
TITLE: SERVER MIDDLEWARE
NOTE: RUNS AT EVERY REQUEST SUBMISSION*/
const logger = require('./src/middleware/Logger')
const passwordProtected = require('./src/middleware/PasswordProtected')
server.use(logger)
server.use(passwordProtected)
/*
TITLE: STANDARD FUNCTIONS */
const sanitizeData = data => {
	return sanitizeHTML(data, { allowedTags: [], allowedAttributes: {} })
}
/*
TITLE: HANDLE SINGLE ROUTES (OR ENDPOINTS) */
const CollectionName = 'items'
/*
NOTE: READ ITEMS FROM DATABASE */
server.get('/', (request, response) => {
	database
		.collection(CollectionName)
		.find()
		.toArray((error, items) => {
			response.send(
				`<!DOCTYPE html>
					<html>
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Simple To-Do App</title>
						<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
					</head>
					<body>
						<div class="container">
							<h1 class="display-4 text-center py-1">To-Do App</h1>
							
							<div class="jumbotron p-3 shadow-sm">
								<form id="create-form" action="/create-item" method="POST">
									<div class="d-flex align-items-center">
										<input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
										<button class="btn btn-primary">Add New Item</button>
									</div>
								</form>
							</div>
							
							<ul id="item-list" class="list-group pb-5">
							</ul>
						</div>

						<script>
							let items = ${JSON.stringify(items)}
						</script>
						<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
						<script src="/browser.js"></script>						
					</body>
				</html>`
			)
		})
})

/*
NOTE: CREATE ITEM IN DATABASE
IMPORTANT: 'sanitizeHTML' IS INCLUDED TO SANITISE DATA COLLECTED IN DATABASE*/
server.post('/create-item', (request, response) => {
	const item = sanitizeData(request.body.item)
	const createObject = { item }
	database.collection(CollectionName).insertOne(createObject, (error, info) => {
		response.json(info.ops[0])
	})
})

/*
NOTE: UPDATE ITEM IN DATABASE
IMPORTANT: 'sanitizeHTML' IS INCLUDED TO SANITISE DATA COLLECTED IN DATABASE*/
server.post('/update-item', (request, response) => {
	const newValue = sanitizeData(request.body.item)
	const elementId = request.body.id
	const updateObject = {
		item: newValue
	}
	database
		.collection(CollectionName)
		.findOneAndUpdate(
			{ _id: new mongodb.ObjectId(elementId) },
			{ $set: updateObject },
			() => {
				response.send('Success')
			}
		)
})

/*
NOTE: DELETE ITEM FROM DATABASE */
server.post('/delete-item', (request, response) => {
	const elementId = request.body.id
	database
		.collection(CollectionName)
		.deleteOne({ _id: new mongodb.ObjectId(elementId) }, () => {
			response.send('Success')
		})
})
