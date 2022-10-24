from django.db import models

# Create your models here.

done_or_not = (
    ('Сделано', 'Сделано'),
    ('Не сделано', 'Не сделано')
)

class Task(models.Model):
    task = models.CharField(max_length=256)
    amount = models.PositiveIntegerField()
    done = models.PositiveIntegerField()
    status = models.CharField(choices=done_or_not, max_length=10, default='Не сделано')

