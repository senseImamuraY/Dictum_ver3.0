# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < ApplicationController
  def index
    # wrap_parameters format: []
    # _wrap_parameters false
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end