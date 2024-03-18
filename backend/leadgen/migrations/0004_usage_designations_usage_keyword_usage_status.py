# Generated by Django 5.0.2 on 2024-03-17 07:02

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leadgen', '0003_organizationdata_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usage',
            name='designations',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(null=True), null=True, size=None),
        ),
        migrations.AddField(
            model_name='usage',
            name='keyword',
            field=models.CharField(choices=[('ORGANIZATION', 'Organization'), ('LEADS', 'Leads')], max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='usage',
            name='status',
            field=models.CharField(null=True),
        ),
    ]
