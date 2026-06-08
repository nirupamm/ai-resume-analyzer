from django.urls import path
from .views import ResumeUploadView
from .views import ResumeUploadView, ResumeAnalysisListView
from .views import (
    ResumeUploadView,
    ResumeAnalysisListView,
    ResumeStatsView,
    ResumeRewriteView
)

urlpatterns = [
    path("upload-resume/", ResumeUploadView.as_view()),
    path("analyses/", ResumeAnalysisListView.as_view()),
    path("stats/", ResumeStatsView.as_view()),
    path("rewrite-resume/", ResumeRewriteView.as_view()),
]