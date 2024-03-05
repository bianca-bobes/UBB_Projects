p=input("input probability between 0.05 and 0.95 = ");
for n=1:3:100
  x=0:n;
  y=binopdf(x,n,p);
  pause(0.5);
endfor
