#a)
M = input("Input the M: M=");
Sigma = input("Input the Sigma: Sigma=");
p1 = normcdf(0,M,Sigma);
printf ('P(X ≤ 0) = %1.6f\n',p1);
p2 = normpdf(0,M,Sigma);
printf ('P(X ≥ 0) = %1.6f\n',p2);
#b)

p3= normcdf(1,M,Sigma)-normcdf(-1,M,Sigma);
printf ('P(−1 ≤ X ≤ 1) = %1.6f\n',p3);
p4 = 1-p3;
printf ('P(X ≤ −1 or X ≥ 1) = %1.6f\n',p4);
#c) + d)
alfa = input("Input the alfa: alfa = ");
beta = input("Input the beta: beta = ");
p5 = norminv(alfa,M,Sigma);
printf ('P_alfa = %1.6f\n',p5);
p6 = norminv(1-beta,M,Sigma);
printf ('P_beta = %1.6f\n',p6);
