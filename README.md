nodejs_chat
===========

Node js chat example from php academy tutorial.
I have tried to bind everything in one js library _chat 
This is primarily a self learning exercise.
which can be used as below:

_chat({
				"name" : "chat_name_input_box_id",
				"msg" : "chat_msg_textarea_id",
				"chatArea" : "chat_messages_div_id",
				"status" : "status_div_id",
				"url" : "node_js_chat_server_url like http://127.0.0.1:8080"
			}).init();


include ./js/chat.js in your html
start nodejs server by node server.js
NOTE: nodejs requires mongodb and socket.io turned on.
