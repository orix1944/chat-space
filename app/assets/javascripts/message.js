$(function(){
  function buildHTML(message){
    if(message.text != 0){
      var content = `<p class="lower-message__content">
        ${message.text}
      </p>`
    }
    else{
      var content = `<img src= ${message.image} class: 'lower-message__image'>`
    }
    var html = `<div class="message">
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

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
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
    })
  });

