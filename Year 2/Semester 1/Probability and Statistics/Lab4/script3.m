N=input('Enter number of simuations, N=');
p=input('Enter probability it should be between 0 and 1, p=');
X = zeros(1,N);

for(i=1:N)
  X(i)=0;
  while(rand >= p)
    X(i) = X(i)+1;
  endwhile
endfor

k=0:20;
p_k=geopdf(k,p);
U_X = unique(X);
n_X = hist(X,length(U_X));
rel_freq = n_X/N;
plot(U_X,rel_freq,'*',k,p_k,'o')
