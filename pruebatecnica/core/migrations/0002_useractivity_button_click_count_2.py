# Generated by Django 5.1.3 on 2024-11-09 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useractivity',
            name='button_click_count_2',
            field=models.IntegerField(default=0),
        ),
    ]
