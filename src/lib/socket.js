import SocketIO from 'socket.io'

var Socket = {
	io : null,
	setup : function(server){
		this.io = SocketIO(server)
		return this.io
	}
}

export default Socket