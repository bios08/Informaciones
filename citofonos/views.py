from django.shortcuts import render

# Create your views here.


def prueba(request):
    context = {}
    context['uno'] = 'a'
    return render(request, "citofonos/prueba.html", context)