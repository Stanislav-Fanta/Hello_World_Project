# Generated by Django 3.2 on 2022-10-22 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_auto_20221010_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('Сделано', 'Сделано'), ('Не сделано', 'Не сделано')], default='Не сделано', max_length=10),
        ),
        migrations.AlterField(
            model_name='task',
            name='task',
            field=models.CharField(max_length=256),
        ),
    ]
