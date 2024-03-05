# X ~ Bino(3,0.5)
px = binopdf(x,3,0.5);
hold on
xx=0:0.01:n;
cx= binocdf(xx,n,p);
plot(xx,cx,'g');
hold on
p1= binopdf(0,3,0.5);
printf('P(X=0)=%1.6f\n',p1);
p2 =1- binopdf(1,3,0.5);
printf('P(X~=1)=%1.6f\n',p2);
p3 = binocdf(2,3,0.5);
printf('P(X<=2)=%1.6f\n',p3)
#P(X<2)=P(X<=1)
p4 = binocdf(1,3,0.5);
printf('P(X<2)=%1.6f\n',p4)
#1-P(X<1)
p5=binocdf(0,3,0.5);
printf('P(X>=1)=%1.6f\n',p5)

p6=1-binocdf(1,3,0.5);
printf('P(X>1)=%1.6f\n',p5)
