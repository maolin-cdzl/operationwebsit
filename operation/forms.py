from django import forms

class LoginForm(forms.Form):
    account = forms.CharField(max_length=32)
    password = forms.CharField(widget=forms.PasswordInput())
