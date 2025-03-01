from django.db import models
from users.models import Employee


# Create your models here.
class Patent(models.Model):
    
    patent_no = models.CharField(primary_key=True)
    patent_title = models.CharField(max_length=100)
    patent_id = models.CharField(unique=True)
    client_name = models.CharField(max_length=100)
    fer_status = models.BooleanField(default=False)
    payment_status = models.BooleanField(default=False)
    blacklist_status = models.BooleanField(default=False)
    
    STATUS_CHOICES = (
        ('not_started', 'not_started'),
        ('in_progress', 'in_progress'),
        ('checking', 'checking'),  
        ('completed', 'completed')
    )
    ps_status = models.CharField(choices=STATUS_CHOICES, default='not_started')
    cs_status = models.CharField(choices=STATUS_CHOICES, default='not_started')
    other_forms_status = models.CharField(choices=STATUS_CHOICES, default='not_started')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if len(self.patent_title) > 30:
            return self.patent_title[:30] + '...'
        return self.patent_title


class PS_table(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    ps_deadline = models.DateField()
    ps_draft_status = models.BooleanField(default=False)
    ps_file_status = models.BooleanField(default=False)


class CS_table(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    cs_deadline = models.DateField()
    cs_draft_status = models.BooleanField(default=False)
    cs_file_status = models.BooleanField(default=False)

class FER_table(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    fer_deadline = models.DateField()
    fer_draft_status = models.BooleanField(default=False)
    fer_file_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class PatentPerson(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    role = models.CharField(choices=(('applicant', 'applicant'), ('inventor', 'inventor')))

class Other_forms(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    pOR = models.BooleanField(default=False)
    form26 = models.BooleanField(default=False)
    form18 = models.BooleanField(default=False)
    form18_a = models.BooleanField(default=False)
    form9 = models.BooleanField(default=False)
    form9_a = models.BooleanField(default=False)
    form13 = models.BooleanField(default=False)
    deadline = models.DateField()

class patent_assgn_table(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    emp_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role = models.CharField(choices=(
        ("drafter", "drafter"),
        ("filer", "filer"),
        ("finance", "finance")
    ), null=False)

class EmployeePatentHistory(models.Model):
    patent_no = models.ForeignKey(Patent, on_delete=models.CASCADE)
    emp_id = models.ForeignKey(Employee, on_delete=models.CASCADE)
    role = models.CharField(choices=(("drafter", "drafter"), ("filer", "filer"), ("finance", "finance")))
    stage = models.CharField(choices=(("ps", "PS"), ("cs", "CS"), ("fer", "FER")))
    timestamp = models.DateTimeField(auto_now_add=True)
