from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from .serializers import ResumeAnalysisSerializer
from .serializers import ResumeUploadSerializer
from .services.text_extractor import extract_text
from .services.llm_service import analyze_resume
from .models import ResumeAnalysis
from django.db.models import Avg, Max, Min
from rest_framework.views import APIView
from .services.llm_service import analyze_resume, rewrite_resume

class ResumeUploadView(APIView):
    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)

        if serializer.is_valid():
            resume_file = serializer.validated_data["resume"]
            job_description = serializer.validated_data.get("job_description", "")

            try:
                extracted_text = extract_text(resume_file)

                if not extracted_text:
                    return Response(
                        {
                            "success": False,
                            "error": "No readable text found in the resume."
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                analysis = analyze_resume(
                    resume_text=extracted_text[:2000],
                    job_description=job_description[:1200]
                )
                ResumeAnalysis.objects.create(
                     filename=resume_file.name,
                     resume_score=analysis.get("resume_score"),
                    job_match_score=analysis.get("job_match_score"),
                    analysis=analysis
                )

                return Response({
                    "success": True,
                    "filename": resume_file.name,
                    "analysis": analysis
                })

            except Exception as e:
                return Response(
                    {
                        "success": False,
                        "error": str(e)
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class ResumeAnalysisListView(ListAPIView):
    queryset = ResumeAnalysis.objects.all().order_by("-created_at")
    serializer_class = ResumeAnalysisSerializer

class ResumeStatsView(APIView):
    def get(self, request):

        analyses = ResumeAnalysis.objects.all()

        stats = analyses.aggregate(
            average_resume_score=Avg("resume_score"),
            average_job_match_score=Avg("job_match_score"),
            highest_resume_score=Max("resume_score"),
            lowest_resume_score=Min("resume_score")
        )

        return Response({
            "total_analyses": analyses.count(),
            **stats
        })
    
class ResumeRewriteView(APIView):
    def post(self, request):
        serializer = ResumeUploadSerializer(data=request.data)

        if serializer.is_valid():
            resume_file = serializer.validated_data["resume"]

            try:
                extracted_text = extract_text(resume_file)

                if not extracted_text:
                    return Response(
                        {
                            "success": False,
                            "error": "No readable text found in the resume."
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                rewrite = rewrite_resume(extracted_text[:2500])

                return Response({
                    "success": True,
                    "filename": resume_file.name,
                    "rewrite": rewrite
                })

            except Exception as e:
                return Response(
                    {
                        "success": False,
                        "error": str(e)
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )