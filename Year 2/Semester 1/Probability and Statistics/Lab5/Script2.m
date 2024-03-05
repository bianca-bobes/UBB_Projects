X1=[22.4 21.7 24.5 23.4 21.6 23.3 22.4 21.6 24.8 20.0]
X2=[17.7 14.8 19.6 19.6 12.1 14.8 15.4 12.6 14.0 12.2]
oneminusalfa=input("Please enter the confidance level: ");
alfa=1-oneminusalfa;
n1=length(X1)
n2=length(X2)
sp=sqrt(((n1-1)*var(X1)+(n2-1)*var(X2))/(n1+n2-2))
m1=(mean(X1)-mean(X2)-tinv(1-alfa/2,n1+n2-2))*sp*sqrt((1/n1)+(1/n2))
m2=(mean(X1)-mean(X2)-tinv(alfa/2,n1+n2-2))*sp*sqrt((1/n1)+(1/n2))

printf('The confidance interval for the diffrence of mean when sigma1=sigma2 is unknown is (%4.3f,%4.3f)\n',m1,m2)
