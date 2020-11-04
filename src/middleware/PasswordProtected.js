const passwordProtected = (request, response, next) => {
	response.set('WWW-Authenticate', 'Basic realm="Simple ToDo App"')
  const authorization = request.headers.authorization
  /*
  TITLE: ENCRYPTED PASSWORD
  IMPORTANT: PASSWORD FOR
  IMPORTANT: USERNAME = admin
  IMPORTANT: PASSWORD = qwerty123456
  IMPORTANT: ENCRYPTION = Basic YWRtaW46cXdlcnR5MTIzNDU2*/
  const password = 'Basic YWRtaW46cXdlcnR5MTIzNDU2' 
	if (authorization == password) {
		next()
	} else {
    response.status(401).send('Authentication required')
	}
}

module.exports = passwordProtected
