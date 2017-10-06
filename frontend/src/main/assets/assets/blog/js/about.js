$(document).ready(function($){
  $.get(
    Common.server + '/is_self_by_pen_name.json',
    {
      penName: Common.getQueryString('penName')
    },
    function(data) {
      if (data.result == 200){
        $(".about-me").html('关于我(todo)');
        $(".contact-me").html('联系方式(todo)');

        $(".about-content").html('<p>你好，主人.todo</p>');
      } else if (data.result == 400){
        $(".about-me").html('关于作者(todo)');
        $(".contact-me").html('联系作者(todo)');

        $(".about-content").html('<p>你好，客人.todo</p>');
      }
    }
  );
});
