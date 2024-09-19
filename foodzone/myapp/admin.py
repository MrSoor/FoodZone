from django.contrib import admin
from .models import Contact
# Register your models here.
admin.site.site_header = "FoodZone | Admin"

class ContactAdmin(admin.ModelAdmin):
    list_display=['id','name','email','subject','add_on','is_approved']
    
admin.site.register(Contact, ContactAdmin)

