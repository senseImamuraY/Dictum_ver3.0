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
    
    # before_save { self.email = email.downcase }
    # validates :name,    presence: true, length: { maximum:50 }
    # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    # validates :email,   presence: true, length: { maximum:255 },
    #                     format: { with: VALID_EMAIL_REGEX },
    #                     uniqueness: { case_sensitive: false }
    # has_secure_password
    # validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    has_many :learning_materials, dependent: :destroy
    # validate :learning_material_size
    # private
    #   def learning_material_size
    #     learning_materials.each do |file|
    #       if file.file.blob.byte_size > 8.megabytes
    #         file.file.purge
    #         error.add(:learning_materials, "ファイルサイズは8MB以内にしてください。")
    #       end
    #     end
    #   end
end
