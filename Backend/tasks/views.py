from django.shortcuts import render, redirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import UpdateView
import json

from .models import Task
from .forms import TaskForm


@csrf_exempt
def home_view(request):
    data = {}
    form = TaskForm()
    data['form'] = form
    tasks = Task.objects.all()
    data['tasks'] = tasks
    return render(request, 'home.html', data)


@csrf_exempt
def add_task_view(request):
    string = request.body.decode('utf-8')
    if string:
        data = json.loads(string)
        task = data.get('task','')
        amount = data.get('amount', '')
        done = data.get('done', '')
        status = data.get('status', '')
        print(status)
        new_task = Task(task=task, amount=amount, done=done, status=status)
        new_task.save()
        return HttpResponse(new_task.pk)
    return HttpResponse('-')


@csrf_exempt
def delete_task_view(request):
    string = request.body.decode('utf-8')
    data = json.loads(string)
    pk = data.get('pk', '')
    if len(pk):
        task = Task.objects.get(id=pk)
        task.delete()
    return HttpResponse('+')


@csrf_exempt
def update_task_view(request):
    string = request.body.decode('utf-8')
    data = json.loads(string)
    task = data.get('task', '')
    amount = data.get('amount', '')
    done = data.get('done', '')
    status = data.get('status', '')
    pk = data.get('pk', '')
    task_object = Task.objects.get(id=pk)
    task_object.task = task
    task_object.amount = amount
    task_object.done = done
    task_object.status = status
    task_object.save()
    return HttpResponse('+')