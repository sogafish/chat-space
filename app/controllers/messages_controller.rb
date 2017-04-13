class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
  end

  def create
    @message = Message.new(body: message_params[:body], image: message_params[:image], group_id: params[:group_id],user_id: current_user.id)
    if @message.save
      render :index
      flash[:notice] = "メッセージの送信が完了しました"
    else
      reder :index
      flash[:notice] = "メッセージの送信に失敗しました。"
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image)
  end
end
