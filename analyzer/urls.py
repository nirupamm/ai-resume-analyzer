from django.urls import path
from .views import ResumeUploadView
from .views import ResumeUploadView, ResumeAnalysisListView

urlpatterns = [
    path("upload-resume/", ResumeUploadView.as_view(), name="upload-resume"),
    path("analyses/", ResumeAnalysisListView.as_view(), name="resume-analyses"),
]