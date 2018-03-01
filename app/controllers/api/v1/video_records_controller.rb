module Api
  module V1
    class VideoRecordsController < ApplicationController
      before_action :group_videos, only: [:statistics]

      def index
        render json: VideoRecord.order(id: :desc)
      end

      def create
        video = VideoRecord.new(video_params)
        if video.save
          render json: video
        else
          render_error(video)
        end
      end

      def destroy
        video = VideoRecord.find(params[:id])
        if video.destroy
          render json: video
        else
          render_error(video)
        end
      end

      def statistics
        count = @grouped.values.sum
        render json: {
          count: count,
          distribution: @grouped.values,
          rate: (count / VideoRecord.sum('finish_time - start_time') rescue 0)
        }
      end

      private

      def render_error(model_instance)
        render json: model_instance.errors.full_messages.join(','), status: 422
      end

      def group_videos
        @grouped = VideoRecord.group(:video_type).count
      end

      def video_params
        params.permit(:title, :start_time, :finish_time, :video_type)
      end
    end
  end
end
