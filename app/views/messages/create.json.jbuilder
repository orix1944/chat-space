json.id         @message.id
json.text       @message.content
json.user_name  @message.user.name
json.image      @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
