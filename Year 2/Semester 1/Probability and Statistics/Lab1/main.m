A=[1 2 3;4 5 6;7 8 9]; #matrice
x=1:2:10;  #vector de la 1 la 10 cu pas 2
A(1:2,2:3); #submatrice capat sus stanga jos dr
A(1,1); #elem matricei
x+2; # aduna 2 la fiecare numar din vectoru din linia 2
functiecool(10);
#help plot in command window ca sa vad cum se face plotu!
#x^2 nu o sa mearga ca sa ridic la patrat trebuie:
x.^2; #. inseamna pointwise
B=[9 8 7;6 5 4;3 2 1];
A*B; #inmultirea normala
A.*B; #inmultire element cu element de pe pozitia aceasi
