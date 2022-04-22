from django import template
from app_dashboard.models import QuizStudentResult
register = template.Library()


@register.filter
def isResultComplete(qz,user):
    result = QuizStudentResult.objects.filter(student=user,quiz=qz)
    is_result = True if result else False
    return is_result