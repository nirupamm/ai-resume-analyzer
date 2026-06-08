from rest_framework import serializers
from .models import ResumeAnalysis


class ResumeUploadSerializer(serializers.Serializer):
    resume = serializers.FileField()
    job_description = serializers.CharField(
        required=False,
        allow_blank=True
    )


class ResumeAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeAnalysis
        fields = "__all__"

class CoverLetterSerializer(serializers.Serializer):
    resume = serializers.FileField()
    job_description = serializers.CharField()
    company_name = serializers.CharField(required=False, allow_blank=True)
    role_title = serializers.CharField(required=False, allow_blank=True)