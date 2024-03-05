A = [1 0 -2;2 1 3;0 1 0];
B = [2 1 1;1 0 -1;1 1 0];
printf("C matrix: \n")
C = A-B
printf("D matrix: \n")
D = A*B
printf("E matrix: \n")
E = A.*B
x = linspace(0,3);
plot(x,f1(x),x,f2(x),x,f3(x))

