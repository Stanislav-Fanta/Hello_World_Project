from django.forms import forms, ModelForm
from .models import Task

class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ['task', 'amount', 'done', 'status']