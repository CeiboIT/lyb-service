(function(){

	 var messageBoxService  = function() {
	 			this.showInfo = function(msg) {
	 	    		_showMessage("info", msg);
	 	    	};
	 			
	 			this.showSuccess = function(msg) {
	 	    		_showMessage("success", msg);
	 	    	};
	 	    	
	 	    	this.showWarning = function(msg) {
	 	    		_showMessage("warning", msg);
	 	    	};
	 	    	
	 	    	this.showError = function(msg, resp) {
	 	    		var msgToShow = msg;
	 	    		_showMessage("error", msgToShow);
	 	    	};
	 	    	
	 	    	 var _showMessage = function(type, msg) {
	 	    		
	 	    		 /************ Toaster configuration *****************/
	 	    		 toastr.options.positionClass = 'toast-bottom-right';
	 	    		 toastr.options.closeButton = true;
	 	    		 toastr.options.showEasing = 'swing';
	 	    		 toastr.options.hideEasing = 'linear';
	 	    		 toastr.options.extendedTimeOut = 10000;
	 	    		 toastr.options.timeOut = 10000;
	 	    		 toastr.options.fadeOut = 250;
	 	    		 toastr.options.fadeIn = 250;
	 	    		 /****************************************************/
	 	    		 
	 	            toastr[type](msg);
	 	    	};
	 }

	angular.module('ceibo.ui', [])
		.service('messageBoxService', messageBoxService)

})()
	

