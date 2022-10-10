from django.db import models

# Create your models here.

done_or_not = (
    ('0', 'Сделано'),
    ('1', "Не сделано")
)

class Task(models.Model):
    task = models.CharField('Задание', max_length=256)
    amount = models.PositiveIntegerField()
    done = models.PositiveIntegerField()
    status = models.CharField('', choices = done_or_not, max_length=1, default='Не сделано')

