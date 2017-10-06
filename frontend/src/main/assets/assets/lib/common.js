var Common = new Object();
Common.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
};

Common.server  = "http://server.scalachan.com:9000";
Common.akkaServer = "http://akka.scalachan.com:5000"

$(document).ready(function($){
	$.ajaxSetup({
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
  });

	Common.isSelf = function(actionTrue, actionFalse){
		$.ajaxSetup({
	    xhrFields: {
	       withCredentials: true
	    },
	    crossDomain: true
	  });

		$.get(
	    Common.server + '/is_self.json',
			{
				accountId: Common.getQueryString('accountId')
			},
			function(data) {
				if(data.result == 200) {
					actionTrue();
				} else if(data.result == 400) {
					actionFalse();
				}
			}
	  );
	};

	Common.modelExitTips = function(modalId, tips){
		$(modalId).on('show.bs.modal', function () {
	    $(window).bind('beforeunload', function(){
	      return tips;
	    });
  	});

		$(modalId).on('hidden.bs.modal', function () {
	    $(window).unbind('beforeunload');
	  });
	};
});
