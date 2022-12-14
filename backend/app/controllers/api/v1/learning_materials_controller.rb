class Api::V1::LearningMaterialsController < ApplicationController
  def index
    user = User.find(params[:user_id])
    learning_materials = user.learning_materials
    render json: learning_materials
  end

  def show
    user = User.find(params[:user_id])
    learning_material = user.learning_materials.find(params[:id])
    render json: learning_material
  end

  def create
    user = User.find(params[:user_id])
    learning_material = user.learning_materials.create!(learning_material_params)
    if learning_material.save
      render json: learning_material
    else
      render json: learning_material.errors, status: 422
    end
  end

  def update
    user = User.find(params[:user_id])
    learning_material = user.learning_materials.find(params[:id])
    if learning_material.update(learning_material_params) 
      render json: learning_material
    else
      render json: learning_material.errors, status: 422
    end
  end

  def destroy
    user = User.find(params[:user_id])
    learning_material = user.learning_materials.find(params[:id])
    if learning_material.destroy 
      head :no_content
    else
      render json: { error: "Failed to destroy"}, status: 422
    end
  end

  private
    def learning_material_params
      params.permit(:subject, :body, :file, :answer, :user_id, :id)
    end
end
