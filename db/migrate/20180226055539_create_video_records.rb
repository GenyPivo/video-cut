class CreateVideoRecords < ActiveRecord::Migration[5.1]
  def change
    create_table :video_records do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :finish_time
      t.integer :video_type

      t.timestamps
    end
  end
end
