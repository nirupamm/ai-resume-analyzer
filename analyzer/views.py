from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import ResumeUploadSerializer
from .services.text_extractor import extract_text
from .services.llm_service import analyze_resume


class ResumeUploadView(APIView):
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

                analysis = analyze_resume(extracted_text[:4000])

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