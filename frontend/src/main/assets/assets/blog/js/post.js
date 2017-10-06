$(document).ready(function($){
  var contentUrl = Common.server + "/blog/post/content.jStr";
  // var authorHomePageUrl = '/blog/index';
  var postId = Common.getQueryString('id');

  $.ajaxSetup({
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
  });

  //does login
  $(function(){

  });

  $(function(){
		var searchParams = Common.getQueryString('share_sha');
    $.get(
      contentUrl,
      {
        id: postId,
        shareSHA: searchParams
      },
      function(json,status){
        if (json.result === 200) {
        	$('title').text(json.title);
          $('#post-title').text(json.title);
          $('#post-introduction').text(json.introduction)

          var homePage = $('.author-home-page');
          homePage.attr('href', '/blog/about?penName=' + encodeURIComponent(json.pen_name));
          homePage.text(json.pen_name);

          $('#post-issue-time').text(json.issue_time);
          postRender(json.body);

					//visitor
					if(json.is_visitor == true) {
						$('#btngp-edit-delete').remove();
					} else { //author
						$('#btngp-edit-delete').show();
					}
        } else if (json.result === 401) {
        	window.location.replace("/401");
        }
      }
    );
  });

$(function(){
  $.get(
    Common.server + '/is_self.json',
    {
      accountId: Common.getQueryString('accountId')
    },
    function(data){
      if(data.result == 200) {
        $('.nav-about').html('关于我(todo)');
      } else if (data.result == 400) {
        $('.nav-about').html('关于作者(todo)');
      }
    }
  );
});
  //transfer raw post body format to xml
  function postRender(body){
//    var content = '# Markdown text goes in here\n## Markdown text goes in here\n### Markdown text goes in here\n```\nvar x = "123"\n```';
    content = body;
		var converter = new showdown.Converter();
    var html = converter.makeHtml(content);
    $('#message-text').html(content);
    $('#post-body').html(html);
  }

  $('#btn-save-blog').click(function(){
    var txt = $('#message-text').val();
    var escapeH5 = $("<div></div>");
    escapeH5.text(txt);
    var coded = escapeH5.html()
    $.post(
      Common.server + "/blog/post/save.jStr",
      {
        postId: postId,
        blog: coded
      },
      function(data, status) {
        var json = jQuery.parseJSON(data);
        if (json.result == 200) {
          postRender(coded)
        } else {
          alert("保存失败 - " + json.error)
        }
      }
    )
  });

  $('#btn-delete-post').click(function(){
		var delt = confirm("确定要删除帖子?");
		if (delt == true) {
			$.post(
				Common.server + "/blog/post/delete.json",
				{
					postId: postId
				},
				function(json, status) {
					if (json.result == 200) {
						window.location.replace("/blog/index");
					} else {
						alert("删除失败 - " + json.error)
					}
				}
			);
  	}
	});

  Common.modelExitTips('#popup-post-edit','文章处于编辑状态。是否确认离开？');
});
