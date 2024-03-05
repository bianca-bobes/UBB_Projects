#simulate 3 main tosses

N=input("Enter the number of simulations: ");

U=rand(3,N);
Y=(U<0.5);#if()U<0.5
X=sum(Y);
clf;
  hist(X);
