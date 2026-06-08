from django.urls import path
from .views import ResumeUploadView
from .views import ResumeUploadView, ResumeAnalysisListView
from .views import (
    ResumeUploadView,
    ResumeAnalysisListView,
    ResumeStatsView,
    ResumeRewriteView,
    CoverLetterView
)


urlpatterns = [
    path("upload-resume/", ResumeUploadView.as_view()),
    path("analyses/", ResumeAnalysisListView.as_view()),
    path("stats/", ResumeStatsView.as_view()),
    path("rewrite-resume/", ResumeRewriteView.as_view()),
    path("generate-cover-letter/", CoverLetterView.as_view()),
]