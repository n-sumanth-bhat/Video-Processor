from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from utilityapp.api import *

urlpatterns = [
    path('api/upload-video/', UploadVideoAPI.as_view(), name='upload-video'),
    path('api/get-all-videos/', GetAllVideosAPI.as_view(), name='get-all-videos'),
    path('api/get-video/<int:video_id>/', GetParticularVideoAPI.as_view(), name='get-specific-video'),
    path('api/get-subtitle/<int:video_id>/', GetSubtitleOfAVideoAPI.as_view(), name='get-subtitle-of-a-video'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
