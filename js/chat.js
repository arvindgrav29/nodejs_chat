function _chat(cfg){
	
   // return a new _chat object if we're in the wrong scope (scope of window object)
   if (window === this) {
      return new _chat(cfg);
   };
   
   if(cfg !== undefined){
		this.name = this.getNode(cfg.name);
		this.msg = this.getNode(cfg.msg);
		this.chatArea = this.getNode(cfg.chatArea);
		this.status = this.getNode(cfg.status);
		this.url = cfg.url === undefined ? 'http://127.0.0.1:8080' :  cfg.url;
	}
   
    var init = function(){};
   
   return this;
}
	
/* _chat Prototype Functions
============================*/

_chat.prototype = { 
	
	getNode : function(id){
		return document.getElementById(id);
    },
	
	printChat : function(data,chatbox){
		if(data.length){
			//loop through the results
			for(var x=0;x< data.length; x=x+1){
				var message = document.createElement('div');
				message.setAttribute('class','chat-message');
					
				var sender = document.createElement('span');
					sender.setAttribute('class','chat-sender');
					sender.appendChild(document.createTextNode(data[x].name + ': '));
							
					message.appendChild(sender);
					message.appendChild(document.createTextNode(data[x].message));
							
					//Append
					chatbox.appendChild(message);
					chatbox.insertBefore(message,chatbox.firstChild);
							
			}
		}
	},
	
	init : function(){
		//chat cfg objects
		var _chatBox = this.chatArea,
			_nameVal = this.name,
			_msgbox = this.msg,
			_status = this.status;
		
		var statusDefault = this.status.textContent,
		    setStatus = function(s){	
					_status.textContent = s;
					if(s !== statusDefault){
						var delay = setTimeout(function(){
							setStatus(statusDefault);
							clearInterval(delay);
						},3000);
					}
			};
				
			try{	
				var socket = io.connect(this.url);
			}catch(e){
				_status.textContent = 'Unable to connect !'
			}
				
			if(socket !== undefined){
				//Listen for output
				socket.on('output',function(data){
					new _chat().printChat(data,_chatBox);
				});
				
				//Listen for status
				socket.on('status',function(data){
					setStatus(typeof data === 'object' ? data.message : data);
					if(data.clear === true){
						_msgbox.value = '';
					}
				});
				
				//Listen for the enter key
				this.msg.addEventListener('keydown',function(event){
					var self = this,
						name = _nameVal.value;
					if(event.which== 13 && event.shiftKey == false){
						socket.emit('input',{
							name: name,
							message: self.value
						});
					}
				});
			}
   
	}
};