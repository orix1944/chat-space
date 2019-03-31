$(function(){

  function appendData(data) {
    var html = `<div class="chat-group-user clearfix">
                    <p1 class="chat-group-user__name">
                    ${ data.name }
                    </p1>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-id=${data.user_id} data-name=${ data.name }>
                    追加
                    </a>
                </div>`
return html;
  }


  function appendUser(user_name, user_id){

      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <h4 class='chat-group-user__name'>${user_name}</h4>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

return html;
  }





    $('.chat-group-form__input').on('keyup', function() {
     var input = $('#user-search-field').val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
     })
      .done(function(datas) {
        datas.forEach(function(data){
          var user = appendData(data);
          $('#user-search-result').append(user)

          });
        })
      .fail(function(){
        alert('ユーザー検索に失敗しました。');
      })

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function() {


      var user_name = $(this).data('name');
      var user_id = $(this).data('id');
      $(this).parent().remove();
      var html = appendUser(user_name, user_id);
          $('#chat-group-users').append(html)

    })
  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function() {
      $(this).parent().remove();
    })
    });
   });



