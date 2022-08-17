class LearningMaterial < ApplicationRecord
  belongs_to :user
  # mount_uploader :file, 
    mount_uploader :file, FileUploader
    default_scope -> { order(created_at: :desc) }
    validates :subject,presence:true
    validates :body,   presence:true
    has_one_attached :file
    validates :user_id, presence: true
    # validates :file,presence:true
    # validates :file,size:         { less_than: 5.megabytes,
    #                                   message: "should be less than 5MB" }
    validate :check_number_of_learning_materials, on: :create

    def check_number_of_learning_materials
      if user && user.learning_materials.count >= 5 
        errors.add(:user, "登録できる音声は５つまでです")
      end
    end
end
