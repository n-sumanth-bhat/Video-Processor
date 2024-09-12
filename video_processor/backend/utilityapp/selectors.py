from .models import Video, Subtitle
from .serializers import VideoSerializer, SubtitleSerializer

# NOTE: Selector class to encapsulate all the fetching operation w.r.t Videos model
class VideoSelectors:
    @staticmethod
    def get_all_videos():
        videos = Video.objects.all()
        return VideoSerializer(videos, many=True).data

    @staticmethod
    def get_particular_video(video_id):
        video = Video.objects.get(id=video_id)
        return VideoSerializer(video).data

# NOTE: Selector class to encapsulate all the fetching operation w.r.t Subtitle model
class SubtitleSelectors:
    @staticmethod
    def get_all_subtitles():
        subtitles = Subtitle.objects.all()
        return SubtitleSerializer(subtitles).data

    @staticmethod
    def get_subtitles(video_id):
        subtitles = Subtitle.objects.filter(video_id=video_id)
        return SubtitleSerializer(subtitles, many=True).data
