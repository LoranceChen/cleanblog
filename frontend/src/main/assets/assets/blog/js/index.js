jQuery(document).ready(function($) {
  var penNameUrl = Common.server + "/blog/pen_name.jStr"
  var overviewUrl = Common.server + "/blog/overview.jStr"

  var PageBlogsCount = 5;
  var currentBlogsCount = 0;

  $.ajaxSetup({
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
  });
  //functions
  //show panName at top of page
  var nameTitle = $.get(penNameUrl,
    function(data,status){
        var json = jQuery.parseJSON(data)
        console.log("Data: " + data + "\nStatus: " + status)
        if (json.result === 200) {
          $('.greet').text("Welcome,"+json.penName)
        }
        else if (json.result === 400) {
          $("#signin-tip").text(json.msg);
          alert(json.msg);
        }
    }
  );
  // nameTitle.done(function(data){
  //   function(data,status){
  //       var json = jQuery.parseJSON(data)
  //       console.log("Data: " + data + "\nStatus: " + status)
  //       if (json.result === 200) {
  //
  //         $('.greet').text("Welcome,"+json.penName)
  //       }
  //       else if (json.result === 400) {
  //         $("#signin-tip").text(json.msg);
  //         alert(json.msg);
  //       }
  //   }
  // });
  // nameTitle().mapFn(data => {
  //   var json = jQuery.parseJSON(data)
  //   console.log("Data: " + data + "\nStatus: " + status)
  //   if (json.result === 200) {
  //     $('.greet').text("Welcome,"+json.penName)
  //   }
  //   else if (json.result === 400) {
  //     $("#signin-tip").text(json.msg);
  //     alert(json.msg);
  //   }
  // });
  // Rx.Observable.from(nameTitle).subscribe(
  //   data => {
  //     data
  //   }
  // );

  //1. master 2. visitor
  Common.isSelf(
    function(){

    },
    function(){}
  );
  //dispaly data
  var paginatorOfBlogs = function(skip, limit, onSuccess){
    $.get(overviewUrl,
      {
        skip: skip,
        limit: limit
      },
      function(data, status){
        var json = jQuery.parseJSON(data)
        console.log("Data: " + data + "\nStatus: " + status)
        if (json.result === 200) {
          var itemCount = json.blogs.length

          var content = {};//why must init ? bad result if only use `var content;`
          content.size = itemCount;
          content.load = "";
          for(i = 0; i < itemCount; i++) {
            content.load +=
              '<div class="post-preview">' +
                '<a href="/blog/post.html?id=' + json.blogs[i].id + '">' +
                  '<h2 class="post-title">' +
                    json.blogs[i].title +
                  '</h2>' +
                  '<h3 class="post-subtitle">' +
                    json.blogs[i].introduction +
                  '</h3>' +
                '</a>' +
                '<p class="post-meta">发布于 <i class="post-time">' + json.blogs[i].issueTime + '</i></p>' +
              '</div>' +
              '<hr>'
          }

          currentBlogsCount += limit;
          onSuccess(content);
        }
        else if (json.result === 400) {
          console.log("get blogs preview jsonStr fail");
        }
      }
    );
  };

  //init blog
  $(function(){
    paginatorOfBlogs(0, PageBlogsCount, function(rsp){
      $('.post-preview-template').replaceWith(rsp.load);
    });
  });

  //next blog
  $('.btn-next-blog').click(function(){
    var ts = $(this);
    paginatorOfBlogs(currentBlogsCount, PageBlogsCount, function(content){
      if(content.size == 0) {
        ts.prop('disabled', true);
        ts.text('没有更多');
      } else {
        $('.post-preview-content').append(content.load);
      }
    })
  });

  $('#btn-create-blog').click(function(){
    window.location = "/blog/post/create.html";
  });

  $('.logout').click(function(){
    $('.logout').text("正在退出...");
    $.cookie('name', null, {path:'/'})
    $.post(
      'post'
    )
  });
});
