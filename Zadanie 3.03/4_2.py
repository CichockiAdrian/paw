lista=[]
c=0
max=[]
with open("sygnaly.txt") as file:
    for line in file:
        if len(lista)>c:
            c=len(lista)
            max=lista
        line=line.strip()
        for char in line:
            if char not in lista:
                lista.append(char)


print(max)
print(c)