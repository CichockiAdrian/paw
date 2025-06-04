from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.db.models import Count
from .models import Mebel, Kategoria
from .forms import MebelForm, KategoriaForm


def lista_mebli(request):
    meble = Mebel.objects.select_related('kategoria').all()
    kategorie = Kategoria.objects.annotate(liczba_mebli=Count('meble'))

    kategoria_id = request.GET.get('kategoria')
    if kategoria_id:
        meble = meble.filter(kategoria_id=kategoria_id)

    dostepne = request.GET.get('dostepne')
    if dostepne == '1':
        meble = meble.filter(dostepny=True)

    context = {
        'meble': meble,
        'kategorie': kategorie,
        'wybrana_kategoria': int(kategoria_id) if kategoria_id else None,
        'pokazuj_dostepne': dostepne == '1'
    }
    return render(request, 'meble/lista_mebli.html', context)


def szczegoly_mebla(request, pk):
    mebel = get_object_or_404(Mebel, pk=pk)
    podobne_meble = Mebel.objects.filter(
        kategoria=mebel.kategoria
    ).exclude(pk=mebel.pk)[:3]

    context = {
        'mebel': mebel,
        'podobne_meble': podobne_meble
    }
    return render(request, 'meble/szczegoly_mebla.html', context)


def dodaj_mebel(request):
    if request.method == 'POST':
        form = MebelForm(request.POST)
        if form.is_valid():
            mebel = form.save()
            messages.success(request, f'Mebel "{mebel.nazwa}" został pomyślnie dodany!')
            return redirect('szczegoly_mebla', pk=mebel.pk)
    else:
        form = MebelForm()

    return render(request, 'meble/dodaj_mebel.html', {'form': form})


def dodaj_kategorie(request):
    if request.method == 'POST':
        form = KategoriaForm(request.POST)
        if form.is_valid():
            kategoria = form.save()
            messages.success(request, f'Kategoria "{kategoria.nazwa}" została pomyślnie dodana!')
            return redirect('lista_mebli')
    else:
        form = KategoriaForm()

    return render(request, 'meble/dodaj_kategorie.html', {'form': form})
