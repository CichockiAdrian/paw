from django.db import models
from django.urls import reverse


class Kategoria(models.Model):
    nazwa = models.CharField(max_length=100, unique=True, verbose_name="Nazwa kategorii")
    opis = models.TextField(blank=True, verbose_name="Opis kategorii")

    class Meta:
        verbose_name = "Kategoria"
        verbose_name_plural = "Kategorie"
        ordering = ['nazwa']

    def __str__(self):
        return self.nazwa


class Mebel(models.Model):
    MATERIAL_CHOICES = [
        ('drewno', 'Drewno'),
        ('metal', 'Metal'),
        ('plastik', 'Plastik'),
        ('szklo', 'Szkło'),
        ('tkanina', 'Tkanina'),
        ('skora', 'Skóra'),
    ]

    nazwa = models.CharField(max_length=200, verbose_name="Nazwa mebla")
    kategoria = models.ForeignKey(
        Kategoria,
        on_delete=models.CASCADE,
        related_name='meble',
        verbose_name="Kategoria"
    )
    material = models.CharField(
        max_length=20,
        choices=MATERIAL_CHOICES,
        verbose_name="Materiał"
    )
    cena = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Cena (PLN)"
    )
    wysokosc = models.PositiveIntegerField(verbose_name="Wysokość (cm)")
    szerokosc = models.PositiveIntegerField(verbose_name="Szerokość (cm)")
    glebokosc = models.PositiveIntegerField(verbose_name="Głębokość (cm)")
    opis = models.TextField(blank=True, verbose_name="Opis")
    dostepny = models.BooleanField(default=True, verbose_name="Dostępny")
    data_dodania = models.DateTimeField(auto_now_add=True, verbose_name="Data dodania")

    class Meta:
        verbose_name = "Mebel"
        verbose_name_plural = "Meble"
        ordering = ['-data_dodania', 'nazwa']

    def __str__(self):
        return f"{self.nazwa} ({self.kategoria.nazwa})"

    def get_absolute_url(self):
        return reverse('szczegoly_mebla', kwargs={'pk': self.pk})

    @property
    def wymiary(self):
        return f"{self.szerokosc} × {self.glebokosc} × {self.wysokosc} cm"