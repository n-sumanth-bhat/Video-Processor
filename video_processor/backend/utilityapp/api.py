from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import *
from .selectors import *


class UploadVideoAPI(APIView):
    @staticmethod
    def post(request):
        data = request.data
        if not data:
            return Response("error: No data sent in the request", status=status.HTTP_400_BAD_REQUEST)
        is_uploaded = VideoService.upload_video(data=data)
        if is_uploaded:
            return Response("Successfully uploaded the video", status=status.HTTP_201_CREATED)
        return Response("error: Something went wrong", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetAllVideosAPI(APIView):
    @staticmethod
    def get(request):
        videos = VideoSelectors.get_all_videos()
        if not videos:
            return Response("No videos uploaded", status=status.HTTP_204_NO_CONTENT)
        return Response(videos)
    

class GetParticularVideoAPI(APIView):
    @staticmethod
    def get(request, video_id):
        video = VideoSelectors.get_particular_video(video_id=video_id)
        if not video:
            return Response("No videos uploaded", status=status.HTTP_204_NO_CONTENT)
        return Response(video)

class GetSubtitleOfAVideoAPI(APIView):
    @staticmethod
    def get(request, video_id):
        subtitle = SubtitleSelectors.get_subtitles(video_id=video_id)
        if not subtitle:
            return Response("No subtitle found for the given video", status=status.HTTP_204_NO_CONTENT)
        return Response(subtitle)



