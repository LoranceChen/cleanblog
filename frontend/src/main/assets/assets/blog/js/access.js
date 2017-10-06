$(document).ready(function($){
	//global
	var globalShareSHA = "";
	var postId = Common.getQueryString('id');
	$.ajaxSetup({
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
  });

	var shareElem = $('#btn-share-post')
	$(function(){
		$.get(
			Common.server + '/blog/post/access/' + postId + '.json',
			function(json, status) {
				if (json.result == 200) {
					shareElem.data('is-public', json.isPublic);

					if (json.isPublic) {
					  globalShareSHA = json.share_sha;
						shareElem.addClass("btn-warning");
						shareElem.text("公开");
					} else {
						shareElem.addClass("btn-info");
            shareElem.text("个人");
					}
				}
			}
		);
	});

	$('#btn-share-post').click(function(){
		//setting status
		var isPublic = $(this).data('is-public');
		if (!isPublic) {
			onPrivate();
		} else {
			onPublic();
		}
	});

	$('#btn-post-access-modify').click(function(){
		var isPublic = $('#btn-share-post').data('is-public');
		$.post(
			Common.server + '/blog/post/access/modify.json',
			{
				//Q: why pass the parameter?
				//A: though server know the user's status, is a good practice make logic non-context relate
				postId: postId,
				currentIsPublic: isPublic
			},
			function(json) {
				if (json.result == 200) {
					if(json.hasSHA) {//to open status
						globalShareSHA = json.share_sha;


						onPublic();
					} else {//to close status

						onPrivate();
					}
				}
			}
		);
	});

	function onPublic() {
		shareElem.removeClass("btn-info");
		shareElem.addClass("btn-warning");
		shareElem.text("公开");
		shareElem.data('is-public', true);


		$('#access-tips').html('当前帖子是公开状态,访问链接为 ' +
		window.location.href +
		'&share_sha=' + globalShareSHA);
		$('#btn-post-access-modify').text('关闭链接');
	}

	function onPrivate() {
		globalShareSHA = "";
		shareElem.removeClass("btn-warning");
		shareElem.addClass("btn-info");
		shareElem.text("个人");
		shareElem.data('is-public', false);

		$('#access-tips').text('当前帖子为私有状态,是否开放链接?');
    $('#btn-post-access-modify').text('打开链接');
	}
});
