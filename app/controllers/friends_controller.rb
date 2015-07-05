class FriendsController < ApplicationController
  FRIENDS = [
    {
      name: 'John Doe'
    },
    {
      name: 'Jane Doe'
    },
    {
      name: 'Alicia Silverstone'
    },
    {
      name: 'Brad Pitt'
    }
  ]

  def index
    respond_to do |format|
      format.json do
        if params[:name].present?
          friends = FRIENDS.find_all { |friend| friend[:name].downcase.start_with?(params[:name].downcase) }
        else
          friends = FRIENDS
        end

        render json: { friends: friends }
      end

      format.html
    end
  end
end
