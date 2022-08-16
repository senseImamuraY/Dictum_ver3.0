class CreateLearningMaterials < ActiveRecord::Migration[7.0]
  def change
    create_table :learning_materials do |t|
      t.string :subject
      t.text :body
      t.string :file
      t.text :answer


      t.references :user, type: :bigint, foreign_key: true
      t.timestamps
    end
    add_index :learning_materials, [:user_id, :created_at]
  end
end
