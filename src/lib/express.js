export default class {
	constructor (req, res) {
		this.req = req
		this.res = res

		this.res.json = function (jsonObject) {
			this.writeHead(200, { 'Content-Type': 'application/json' })
			this.write( jsonObject )
			return this.end()
		}
	}

	get (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'GET') {
			return callback(this.req, this.res)
		}
	}

	post (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'POST') {
			return callback(this.req, this.res)
		}
	}

	put (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'PUT') {
			return callback(this.req, this.res)
		}
	}

	delete (path, callback) {
		if(this.req.url.toLowerCase() === path.toLowerCase() && this.req.method.toUpperCase() === 'DELETE') {
			return callback(this.req, this.res)
		}
	}

}

