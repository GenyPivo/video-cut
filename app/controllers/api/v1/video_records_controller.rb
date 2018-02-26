module Api
  module V1
    class VideoRecordsController < ApplicationController
      def index
        render json: VideoRecord.all
      end

      def create
        video = VideoRecord.new(video_params)
        if (video.save)
          render json: video
        else
          render json: 'Some error happened', status: 400
        end
      end

      private

      def video_params
        params.permit(:title, :start_time, :finish_time, :video_type)
      end
    end
  end
end