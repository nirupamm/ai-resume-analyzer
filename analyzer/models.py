from django.db import models


class ResumeAnalysis(models.Model):
    filename = models.CharField(max_length=255)
    score = models.IntegerField(null=True, blank=True)
    analysis = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename