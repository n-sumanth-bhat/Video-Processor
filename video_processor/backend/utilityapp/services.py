import os, logging
import subprocess
from django.conf import settings
from .models import Video, Subtitle
from .serializers import VideoSerializer, SubtitleSerializer
from utils.custom_exceptions import *
from django.db import transaction

logger = logging.getLogger(__name__)


class VideoService:
    @staticmethod
    @transaction.atomic
    def upload_video(data):
        serializer = VideoSerializer(data=data)
        if serializer.is_valid():
            video = serializer.save()
            VideoService.process_video(video)
            return True
        return False


    @staticmethod
    def process_video(video):
        video_path = os.path.join(settings.MEDIA_ROOT, video.video_file.name)

        # Get the subtitle streams information
        ffprobe_command = [
            'ffprobe',
            '-v', 'error',
            '-select_streams', 's',
            '-show_entries', 'stream=index:stream_tags=language',
            '-of', 'csv=p=0',
            video_path
        ]
        try:
            result = subprocess.run(ffprobe_command, capture_output=True, text=True, check=True)
        except subprocess.CalledProcessError as e:
            logger.error("Failed to run ffprobe on %s: %s", video_path, e)
            raise OperationError(f"Failed to run ffprobe on {video_path}: {e}")
        
        subtitle_streams = result.stdout.strip().split('\n')
        logger.debug('Subtitle streams: %s', subtitle_streams)

        if not subtitle_streams or subtitle_streams[0] == '':
            logger.info("No subtitle streams found for video %s", video.id)
            raise NotFoundException("No subtitle streams found for the video")

        for stream in subtitle_streams:
            parts = stream.split(',')
            if len(parts) == 2:
                index, language = parts
            elif len(parts) == 1:
                index = parts[0]
                language = 'unknown'  # Default or handle missing language
            else:
                logger.warning('Skipping invalid stream format: %s', stream)
                continue

            index = int(index)  # Ensure index is an integer
            subtitle_path = os.path.join(settings.MEDIA_ROOT, f"{video.id}_{language}.srt")
            
            ffmpeg_command = [
                'ffmpeg',
                '-i', video_path,
                '-map', f'0:s:{index}?',
                subtitle_path
            ]

            try:
                subprocess.run(ffmpeg_command, check=True)
                logger.info('Successfully extracted subtitle %s with index %s', language, index)
                
                # Read the extracted subtitles
                with open(subtitle_path, 'r', encoding='utf-8') as file:
                    content = file.read()

                subtitle_data = {
                    'video': video.id,
                    'language': language,
                    'content': content,
                }
                SubtitleService.create_subtitle(subtitle_data)
            except subprocess.CalledProcessError as e:
                logger.error('Failed to process stream %s with language %s: %s', index, language, e)
            except FileNotFoundError as e:
                logger.error('Subtitle file not found for stream %s with language %s: %s', index, language, e)
            except Exception as e:
                logger.error('Unexpected error processing stream %s with language %s: %s', index, language, e)


class SubtitleService:
    @staticmethod
    def create_subtitle(data):
        serializer = SubtitleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
