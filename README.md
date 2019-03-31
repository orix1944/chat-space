# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|body    |text   |null: true|
|image   |string |null: true|

### Association
- belongs_to :group
- belongs_to :user


## userテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|add_index|
|mail|string|null: false|
|encrypted passward|string|null: false|

###association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

###association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages

## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belonhs_to :group




class GroupsController < ApplicationController

   def new
       @groups = Group.new
       @users = User.all
   end

   def create
    Group.create(name: group_params[:name])
    Group_users.create(user_id: [])
   end

   def edit
    @groups = Group.find(params[:id])

   end

   def update
          group = Group.find(params[:id])

   end




    private
      def group_params
        params.require(:group).permit(:name, user_ids: [])

      end

end




= form_for @group do |f|
  .chat-group-form
    %h1
      新規チャットグループ
      #new_chat_group.new_chat_group
        - if @group.errors.any?
          .chat-group-form__errors
            %h2
              1件のエラーが発生しました。
              %ul
                %li エラーです
          .chat-group-form__field.clearfix
            .chat-group-form__field--left
              / %label.chat-group-form__label{for: "chat_group_name"} グループ名
              = f.label 'グループ名' , class: "chat-group-form__label"
            .chat-group-form__field--right
              /   %input#chat_group_name.chat-group-form__input{name: "chat_group[name]", placeholder: "グループ名を入力してください", type: "text"}/
              = f.text_field :name, placeholder: "グループ名を入力してください", type: "text" ,id: "chat_group_name",class: "chat-group-form__input"
          .chat-group-form__field.clearfix
            / この部分はインクリメンタルサーチ（ユーザー追加の非同期化のときに使用します
            /
              <div class='chat-group-form__field--left'>
              <label class="chat-group-form__label" for="chat_group_チャットメンバーを追加">チャットメンバーを追加</label>
              </div>
              <div class='chat-group-form__field--right'>
              <div class='chat-group-form__search clearfix'>
              <input class='chat-group-form__input' id='user-search-field' placeholder='追加したいユーザー名を入力してください' type='text'>
              </div>
              <div id='user-search-result'></div>
              </div>
          .chat-group-form__field.clearfix
            .chat-group-form__field--left
              / %label.chat-group-form__label{for: "chat_group_チャットメンバー"} チャットメンバー
              = f.label 'チャットメンバー' , class: "chat-group-form__label"
            .chat-group-form__field--right
              = f.collection_check_boxes :user_ids, User.all, :id, :name

              / この部分はインクリメンタルサーチ（ユーザー追加の非同期化のときに使用します
              /
                <div id='chat-group-users'>
                <div class='chat-group-user clearfix' id='chat-group-user-22'>
                <input name='chat_group[user_ids][]' type='hidden' value='22'>
                <p class='chat-group-user__name'>seo_kyohei</p>
                </div>
                </div>
          .chat-group-form__field.clearfix
            .chat-group-form__field--left
            .chat-group-form__field--right
              / %input.chat-group-form__action-btn{"data-disable-with": "Save", name: "commit", type: "submit", value: "Save"}/
              = f.submit class: 'chat-group-form__action-btn'




/ "/groups/new_path"

 / .room-name
      /   %h2
      /     room-name
      / .message-log
      /   %h3
      /     message-log



form    message.index.html.haml


%form#new_message{"accept-charset":"UTF-8", action:"/groups/697/messages", enctype: "multipart/form-data", method: "post"}
        %input{name: "utf8", type: "hidden", value: "✓"}/
        %input{name: "authenticity_token", type: "hidden", value: "K/hCQAIIBza1DL57dcAn9yQLnr/huS5X7YUl+H9/vjIB3MKnFUZpQNPKpc6u+V6HXWDZwNeeylqqx5yEKsOFUA=="}/

        .main-form__new-massage__input-box
          %input#message_content{name: "message[content]", placeholder: "type a message", type: "text"}/


          %lavel.main-form__new-massage__input-box__image
            %i.fa.fa-image
        %input.main-form__submit-btn{"data-disable-with":"Send", name: "commit", type: "submit", value: "Send"}/




- current_user.groups.each do |group|
        = link_to group_messages_path(group) do
          .group__name
            = group.name
          .group__message
            = render @messages






// .main-form__new-message__input-box{
             //   position: relative;
             //   width: 100%;
             //   box-sizing: border-box;

             //   #message_content{
             //      height: 50px;
             //      width: 100%;
             //      padding: 0 -10px 0 10px;
             //      color: #434a54;
             //      border-style: none;



             .main-form{
    height: 90px;
    padding: 20px 40px;
    background-color: #ddd;
    box-sizing: border-box;
              // .form{
              //   display: flex;
              //   box-sizing: border-box;
              //   margin:0;
                // padding: 0;

          .form__message{
              height: 50px;
              width: 640px;
              padding: 0 40px 0 10px;
              color: #434a54;
              border-style: none;
              position: relative;
          .form__mask{
              font-size: 1.3rem;
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
                   }
                      .icon{
                          display: inline-block;
                          font: normal normal normal 14px/1 FontAwesome;
                          font-size: inherit;
                          text-rendering: auto;
                          -webkit-font-smoothing: antialiased;
                }
            }
          .form__submit{
            width: 100px;
            height: 50px;
            padding: 0 30px;
            margin-left: 15px;
            background-color: #38aef0;
            color: white;
            cursor: pointer;


      }
    }




%form#new_message{"accept-charset":"UTF-8", action:"/groups/697/messages", enctype: "multipart/form-data", method: "post"}
        %input{name: "utf8", type: "hidden", value: "✓"}/
        %input{name: "authenticity_token", type: "hidden", value: "K/hCQAIIBza1DL57dcAn9yQLnr/huS5X7YUl+H9/vjIB3MKnFUZpQNPKpc6u+V6HXWDZwNeeylqqx5yEKsOFUA=="}/

        .main-form__new-massage__input-box
          %input#message_content{name: "message[content]", placeholder: "type a message", type: "text"}/


          %lavel.main-form__new-massage__input-box__image
            %i.fa.fa-image
        %input.main-form__submit-btn{"data-disable-with":"Send", name: "commit", type: "submit", value: "Send"}/



        .main-message
        .main-message__upper-info
          %p.main-message__upper-info__talker
            サンプル
          %p2.main-message__upper-info__data
            サンプル
        %p3.main-message__text
          hello








 @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
       render :index





        $('.main-messages').height()


        ■解決したいこと
group_userテーブルにデータを保存したい

■自力で調べた内容
グループメンバーとグループ名が逆に保存されているのでhtmlを見直したがなぜそうなるのかがサンプルを見てもわからなかった。


# current_userを出現しない方法
# 1. where文の比較条件で、current_userが出現しないようにする条件を加える
# 2. where.not文を使い、current_userを出現しないようにする

# 1. 27 ~ 30行目のhtmlの記述をhamlの記述方法にする
# 2. 28行目、= f.hidden_fieldのを使って、書き換える
# 3. name属性にキー指定とvalueにcurrent_userのidを入れる
# 4. view上で、current_userの名前を表示されるようにする
