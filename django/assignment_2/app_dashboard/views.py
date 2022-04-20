from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
# from app_dashboard.forms import SetExamQuizForm
from app_dashboard.models import *

# Create your views here.

@login_required(login_url='signin')
def dashboard_view(request):
    quiz_qs = Quiz.objects.all()
    context = {
        'quiz_qs':quiz_qs
    }
    return render(request,'app_dashboard/dashboard.html',context)



def addQuiz_view(request):
    lastAnswer = QuizQuestionAnswer.objects.last()
    lastAnswerId = lastAnswer.id if lastAnswer else 0

    if request.method == 'POST':
        quizTitle = request.POST.get('quiztitle')
        quizActive= True if request.POST.get('quizactive') else False
        quizObj = Quiz.objects.create(teacher=request.user, title=quizTitle, active=quizActive)

        copyRequstData = request.POST.copy()
        qQuesFields = { k:v for (k,v) in copyRequstData.items() if k.startswith('ques')}
        qQuesAnsFields = { k:v for (k,v) in copyRequstData.items() if k.startswith('qans')}
        qCorrectAns = { k:v for (k,v) in copyRequstData.items() if k.startswith('iscorrect')}

        for key1, val1 in qQuesFields.items() :
            quizQuesObj = QuizQuestion.objects.create(quiz = quizObj,text=val1)

            for key2, val2 in qQuesAnsFields.items() :
                if key1 in key2 :
                    isCorrect = False

                    for key3, val3 in qCorrectAns.items():
                        if (key1 and key2 in key3) and val3:
                            isCorrect=True
                            QuizQuestionAnswer.objects.create(question = quizQuesObj,text = val2,is_correct=True)
                            continue

                    if not isCorrect:
                        QuizQuestionAnswer.objects.create(question = quizQuesObj,text = val2)
                        continue

        return redirect('quizlist')
    context = {
        'lastAnswerId':lastAnswerId,
    }
    return render(request,'app_dashboard/add_quiz.html',context)



def quizList_view(requset):
    quiz_qs = Quiz.objects.filter(teacher = requset.user)
    return render(requset,'app_dashboard/quizlist.html',{'quiz_qs':quiz_qs})



def updateQuiz_view(request,pk):
    quizObj= Quiz.objects.filter(id=pk)[0]
    lastAnswer = QuizQuestionAnswer.objects.last()
    lastAnswerId = lastAnswer.id if lastAnswer else 0

    if request.method == 'POST':
        quizTitle = request.POST.get('quiztitle')
        quizActive= True if request.POST.get('quizactive') else False

        quizObj.title = quizTitle
        quizObj.active = quizActive
        quizObj.save()

        copyRequstData = request.POST.copy()
        qQuesFields = { k:v for (k,v) in copyRequstData.items() if k.startswith('ques')}
        qQuesAnsFields = { k:v for (k,v) in copyRequstData.items() if k.startswith('qans')}
        qCorrectAns = { k:v for (k,v) in copyRequstData.items() if k.startswith('iscorrect')}
        print(qQuesFields)
        print(qQuesAnsFields)
        print(qCorrectAns)
        for key1, val1 in qQuesFields.items() :
            qQuesId = int(key1.split('=')[1])
            quizQuesObj,created = QuizQuestion.objects.update_or_create(id=qQuesId,defaults=dict(quiz=quizObj,text=val1))

            for key2, val2 in qQuesAnsFields.items() :
                if key1 in key2 :
                    qQuesAnsId = int(key2.split('&')[0].split('=')[1])
                    isCorrect = False

                    for key3, val3 in qCorrectAns.items():
                        if (key1 and key2 in key3) and val3:
                            print(key1, key2 ,key3,val1,val2,val3,'Correct')
                            isCorrect=True
                            QuizQuestionAnswer.objects.update_or_create(id=qQuesAnsId,defaults=dict(question=quizQuesObj, text=val2, is_correct=True))
                            continue

                    if not isCorrect:
                        QuizQuestionAnswer.objects.update_or_create(id=qQuesAnsId,defaults=dict(question=quizQuesObj, text=val2, is_correct=False))
                        continue

        return redirect('update_quiz',pk)
    context = {
        'quizObj':quizObj,
        'lastAnswerId':lastAnswerId,
    }
    return render(request,'app_dashboard/update_quiz.html',context)



def quizExam_view(request,pk):
    result = False
    quizObj = Quiz.objects.get(id=pk)
    result = QuizStudentResult.objects.filter(student=request.user,quiz=quizObj)
    result = result[0] if result else False
    if (request.method == 'POST' and quizObj.active) and not result:
        tqs = quizObj.quizqs.count()
        tca = 0
        for req in request.POST:
            if 'quiz' in req:
                quesId = int(req.split('=')[1])
                ansId = int(request.POST.get(req))
                ans = QuizQuestionAnswer.objects.get(id=ansId)
                stdAnsObj = QuizStudentAnswer(student=request.user,answer=ans,is_correct=ans.is_correct)
                stdAnsObj.save()
                if ans.is_correct:
                    tca+=1

        scr = round((tca*100)/tqs,2)
        QuizStudentResult.objects.create(student=request.user,quiz=quizObj,score=scr,tca=tca,complete=True)
        return quizExam_view(request,pk)

    context={
        'quizObj':quizObj,
        'result':result,
    }

    return render(request,'app_dashboard/quiz_exam.html',context)


    
def deleteQuiz_view(request,pk):
    Quiz.objects.get(id=pk).delete()
    return redirect('quizlist')



def deleteQuizQues_view(request,pk):
    QuizQuestion.objects.get(id=pk).delete()
    return HttpResponse()



def deleteQuizAns_view(request,pk):
    QuizQuestionAnswer.objects.get(id=pk).delete()
    return HttpResponse()