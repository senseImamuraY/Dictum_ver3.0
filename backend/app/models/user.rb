# frozen_string_literal: true

class User < ActiveRecord::Base
            # Include default devise modules.
            devise :database_authenticatable, :registerable,
                    :recoverable, :rememberable, 
                    # :trackable, 
                    :validatable,
                    # :confirmable,
                    :omniauthable
            include DeviseTokenAuth::Concerns::User
    has_many :learning_materials, dependent: :destroy
end
