if @new_messages.present?
  json.array! @new_messages do |message|
  json.text       message.content
  json.user_name  message.user.name
  json.image      message.image.url
  json.created_at message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id         message.id
  end
end

