# Generated by Django 5.1.3 on 2024-11-10 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_useractivity_button_click_count_2'),
    ]

    operations = [
        migrations.AddField(
            model_name='useractivity',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
