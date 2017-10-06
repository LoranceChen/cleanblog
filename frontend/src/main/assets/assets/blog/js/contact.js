$(document).ready(function($){
  $.get(
    Common.server + '/is_self_by_pen_name.json',
    {
      penName: Common.getQueryString('penName')
    },
    function(data) {
      if (data.result == 200){
        $(".contact-me").html('联系方式');
        $(".contact-content").html('<p>你好，主人.todo</p>');
      } else if (data.result == 400){
        $(".contact-me").html('联系作者');
        $(".contact-content").html('<p>你好，客人.todo</p>');
      }
    }
  );
});
