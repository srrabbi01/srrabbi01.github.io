from multiprocessing import context
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# from app_dashboard.forms import SetExamQuizForm
from app_dashboard.models import *
from elearn.decorators import *
# Create your views here.

@login_required(login_url='signin')
def dashboard_view(request):
    quiz_qs = Quiz.objects.all()
    context = {
        'quiz_qs':quiz_qs
    }
    return render(request,'app_dashboard/dashboard.html',context)



@login_required(login_url='signin')
@user_is_teacher
def addQuiz_view(request):
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
    return render(request,'app_dashboard/create_quiz.html')



@login_required(login_url='signin')
@user_is_teacher
def quizList_view(requset):
    quiz_qs = Quiz.objects.filter(teacher = requset.user)
    return render(requset,'app_dashboard/quizlist.html',{'quiz_qs':quiz_qs})



@login_required(login_url='signin')
@user_is_teacher
def updateQuiz_view(request,pk):
    quizObj= Quiz.objects.filter(id=pk,teacher=request.user)[0]
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
            quizQuesObj = QuizQuestion.objects.filter(id=qQuesId,quiz=quizObj)
            if quizQuesObj:
                quizQuesObj = quizQuesObj[0]
                quizQuesObj.text=val1
                quizQuesObj.save()
            else:
                quizQuesObj = QuizQuestion.objects.create(quiz=quizObj,text=val1)

            for key2, val2 in qQuesAnsFields.items() :
                if key1 in key2 :
                    qQuesAnsId = int(key2.split('&')[0].split('=')[1])
                    quizQuesAnsObj = QuizQuestionAnswer.objects.filter(id=qQuesAnsId,question=quizQuesObj)
                    isCorrect = False

                    for key3, val3 in qCorrectAns.items():
                        if (key1 and key2 in key3) and val3:
                            isCorrect=True
                            if quizQuesAnsObj:
                                quizQuesAnsObj = quizQuesAnsObj[0]
                                quizQuesAnsObj.text = val2
                                quizQuesAnsObj.is_correct = True
                                quizQuesAnsObj.save()
                            else:
                                QuizQuestionAnswer.objects.create(question=quizQuesObj,text=val2,is_correct=True)
                            continue

                    if not isCorrect:
                        if quizQuesAnsObj:
                            quizQuesAnsObj = quizQuesAnsObj[0]
                            quizQuesAnsObj.text = val2
                            quizQuesAnsObj.is_correct = False
                            quizQuesAnsObj.save()
                        else:
                            QuizQuestionAnswer.objects.create(question=quizQuesObj,text=val2,is_correct=False)
                        continue

        return redirect('quizlist')
    context = {
        'quizObj':quizObj,
        'lastAnswerId':lastAnswerId,
    }
    return render(request,'app_dashboard/update_quiz.html',context)



@login_required(login_url='signin')
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



@login_required(login_url='signin')
@user_is_teacher
def deleteQuiz_view(request,pk):
    Quiz.objects.get(id=pk).delete()
    return redirect('quizlist')



@login_required(login_url='signin')
@user_is_teacher
def deleteQuizQues_view(request,pk):
    QuizQuestion.objects.get(id=pk).delete()
    return HttpResponse()



@login_required(login_url='signin')
@user_is_teacher
def deleteQuizAns_view(request,pk):
    QuizQuestionAnswer.objects.get(id=pk).delete()
    return HttpResponse()