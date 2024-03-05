pkg load statistics;
n = input("Enter the number of trials: n="); #n - natural number
p = input("Enter the probability of success: p="); #p is between 0 and 1
x=0:1:n; #number of succesess in n trials
px = binopdf(x,n,p);

plot(x,px,'*r');
hold on
xx=0:0.01:n;
cx= binocdf(xx,n,p);
plot(xx,cx,'g');

