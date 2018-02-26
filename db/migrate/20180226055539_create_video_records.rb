class CreateVideoRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :video_records do |t|
      t.string :title
      t.float :start_time
      t.float :finish_time
      t.integer :video_type

      t.timestamps
    end
  end
end
