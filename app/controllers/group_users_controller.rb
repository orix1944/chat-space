class GroupUsersController < ApplicationController

def create
Group_user.create(user_ids: [])
# binding.pry
end



end
