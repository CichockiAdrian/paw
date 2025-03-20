
slowa = []
c=1
with open("sygnaly.txt") as file:
    for line in file:
        slowo = line.strip()
        if c==0:
            print (slowo)
        c=0
        for i in range(len(slowo)):
            for j in range(i+1,len(slowo)):
                if abs(ord(slowo[i])-ord(slowo[j]))>10:
                    c=c+1


print(slowa)
