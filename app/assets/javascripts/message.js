$(function(){
  function buildHTML(message){
     if(message.text != 0 && message.image != null){
      var content = `<p class="lower-message__content">
        ${message.text}
      </p>
        <img src= "${message.image}" class: 'lower-message__image'>`
    }

    else if(message.text != 0){
      var content = `<p class="lower-message__content">
        ${message.text}
      </p>`
    }

    else{
      var content = `<img src= "${message.image}" class: 'lower-message__image'>`
    }


    var html = `<div class="message" data-id="${message.id}">
  <div class="upper-message">
    <div class="upper-message__user-name">
      ${message.user_name}
    </div>
    <div class="upper-message__date">
      ${message.created_at}
    </div>
  </div>
  <div class="lower-message">
    ${content}

  </div>
</div>
`
    return html;
  }
  function update(){
    console.log('hey')
    var message_id = $('.message:last').data('id') || 0;
    $.ajax({
      type: 'GET',
      url: location.href,
      data: { id: message_id },
      dataType: 'json',
    })

    .done(function(data){
      console.log('aa')
       if (data.length != null){
       data.forEach(function(message) {
        var html = buildHTML(message);
        $('.main-messages').append(html);
        $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight}, 'fast');
      })
      }
     })
    .fail(function(){
      alert('非同期通信に失敗しました');
    })
   }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    if ( $('.form__message').val() == "" && $(".hidden").val() == ""){
      alert('何か入力してください')
    return false;
    }

    else {
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
       })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-messages').append(html);
        $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight}, 'fast');
        $('.form__submit').attr('disabled', false);
        $('#new_message')[0].reset();
        $('.textbox').val('')
       })
      .fail(function(){
        alert('非同期通信に失敗しました');
      })
    }
  });
  var number = $('.main-content').data('group-id');
  console.log(location.pathname)
  if (location.pathname == `/groups/${number}/messages`) {
    setInterval(update,5000);
  }
});
