from django import forms
from .models import Mebel, Kategoria

class MebelForm(forms.ModelForm):
    class Meta:
        model = Mebel
        fields = ['nazwa', 'kategoria', 'material', 'cena', 'wysokosc', 'szerokosc', 'glebokosc', 'opis', 'dostepny']
        widgets = {
            'nazwa': forms.TextInput(attrs={'class': 'form-control'}),
            'kategoria': forms.Select(attrs={'class': 'form-control'}),
            'material': forms.Select(attrs={'class': 'form-control'}),
            'cena': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'wysokosc': forms.NumberInput(attrs={'class': 'form-control'}),
            'szerokosc': forms.NumberInput(attrs={'class': 'form-control'}),
            'glebokosc': forms.NumberInput(attrs={'class': 'form-control'}),
            'opis': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'dostepny': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }

class KategoriaForm(forms.ModelForm):
    class Meta:
        model = Kategoria
        fields = ['nazwa', 'opis']
        widgets = {
            'nazwa': forms.TextInput(attrs={'class': 'form-control'}),
            'opis': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }