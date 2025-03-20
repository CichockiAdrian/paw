tekst = open("sygnaly.txt").readlines()
leng = len(tekst)

lines = tekst
litery = [line[9] for i,line in enumerate(lines,start=1) if i%40==0 and len(line) >=10]

print(litery)