$(document).ready(function(){
	var verifyApi = Common.server + "/signin.jstr";
	var registerApi = Common.server + "/signin/register.json";
  var rememberApi = Common.akkaServer + "/signin/remember-me.json";
  var loginRecordApi = Common.akkaServer + "/signin/login-record.json";
  var getRegisterMailCodeApi = Common.akkaServer + "/register/send-email.json"

  // Javascript to enable link to tab
  // refer: http://stackoverflow.com/a/9393768/4887726
  $(function(){
    var url = document.location.toString();
    if (url.match('#')) {
        $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
    }

        // Change hash for page-reload
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        window.location.hash = e.target.hash;
    })
  });

  //get data at first login
  $(function(){
    if($.cookie('remember_me') != null) {
      $.get(
        loginRecordApi,
        function(data){
          if(data.result == 200) {
            $('#inputEmail').val(data.account);
            $('#inputPassword').val(data.password);
            $('#remember-me').attr('checked', 'checked');
          }
        }
      );
    }
  });

  //login success
  var rememberMeFunc = function(accountValue, passwordValue, onSuccess){
    var needRemember = $('#remember-me').is(':checked');
    if(needRemember) {
      $.post({
        url: rememberApi,
        data: {
          account: accountValue,
          password: passwordValue
        },
        success: function(data) {
          if(data.result == 200) {
            $.cookie('remember_me', '1', {path: "/",  expires: 365});
          } else {
            $.cookie('remember_me', '', {expires: -1});
          }
          onSuccess();
        },
        xhrFields: {
           withCredentials: true
        },
        crossDomain: true
      });
    } else {
      $.cookie('remember_me', '', {expires: -1});
      onSuccess();
    }
  }

	//functions
	var verifyFunc = function(){
			var accountValue = $('#inputEmail').val();
			var passwordValue = $('#inputPassword').val();

			$(".ajax-btn-verify").prop('disabled', true);
			$(".ajax-btn-verify").text('正在登录...');
			$.post({
				url: verifyApi,
				data: {
					account: accountValue,
					password: passwordValue
				},
				success: function(data,status){
						var json = jQuery.parseJSON(data);
						console.log("Data: " + data + "\nStatus: " + status)
						if (json.result === 200) {
              rememberMeFunc(accountValue, passwordValue, function(){
                window.location.replace("/blog/index");
                //alert("window.location.replace('/blog/index');")
              });
						}
						else if (json.result === 400) {
							$("#signin-tip").text(json.msg);
							$(".ajax-btn-verify").text('登录');
							$(".ajax-btn-verify").prop('disabled', false);
						}
				},
				xhrFields: {
					 withCredentials: true
				},
				crossDomain: true
			});
	};

	var registerFunc = function(){
		//按下之后要等待返回才能进行下次继续请求,防止注册成功再次点击注册会导致错误的提示
		$("#btn-register").prop('disabled', true);
		var invitationCode = $('#inputInvitationCode-register').val()
		var email = $('#inputEmail-register').val()
		var username = $('#inputUsername-register').val()
//		var phone = $('#inputPhone-register')
		var penName = $('#inputPenname-register').val()
		var password = $('#inputPassword-reigster').val()
		var passwordAgain = $('#inputPassword-ensure-reigster').val()

		$.post(registerApi,
			{
				invitationCode: invitationCode,
				email: email,
				username: username,
				penName: penName,
				password: password,
				passwordAgain: passwordAgain
			},
			function(json) {
				if(json.result == 400) {
					$("#btn-register").prop('disabled', false);
					var danger = $('.alert-danger');
					danger.find('.alert-content').text(JSON.stringify(json));
					$('.alert').show();
				} else if(json.result == 200 ) {
					$("#btn-register").prop('disabled', true);
					var danger = $('.alert-danger');
					danger.find('.alert-content').text("注册成功");
          $('.alert').show();
					// window.location.replace("/blog/index");
				}
			}
		)
	}

  var getRegisterMailCodeFunc = function(){
    $("#btn-register-email").prop('disabled', true);
    var email = $('#inputEmail-register').val();

    $.ajaxSetup({
      xhrFields: {
         withCredentials: true
      },
      crossDomain: true
    });

    $.post(getRegisterMailCodeApi,
      {
        tomail: email
      },
      function(json) {
        if(json.result == 200) {
          var danger = $('.alert-danger');
          danger.find('.alert-content').text("已发送");
          $("#btn-register-email").prop('disabled', false);
          $('.alert').show();
        } else if(json.result == 400) {
          var danger = $('.alert-danger');
          danger.find('.alert-content').text("获取失败:" + json.msg);
          $("#btn-register-email").prop('disabled', false);
          $('.alert').show();
        }
      }
    )
  }

  $(".ajax-btn-verify").click(verifyFunc);
  $("#btn-register").click(registerFunc);
  $("#btn-register-email").click(getRegisterMailCodeFunc);
});
