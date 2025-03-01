from django.db import models

# Create your models here.

class Employee(models.Model):

    emp_id = models.CharField(max_length=10, primary_key=True)
    full_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=8, blank=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Full_name
