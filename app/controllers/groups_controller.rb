class GroupsController < ApplicationController
  before_action :move_to_sign_in

  def index
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group), notice: "グループが作成されました。"
    else
      flash.now[:alert] = "グループを作成できませんでした。"
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: "グループを編集できました。"
    else
      flash[:alert] = "グループを編集できませんでした。"
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

  def move_to_sign_in
    redirect_to new_user_session_path unless user_signed_in?
  end
end
