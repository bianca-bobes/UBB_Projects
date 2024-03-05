N=input('Number of simulations, N=');
n=input('Number of trials, n=');
p=input('The probability, needs to be between 0 and 1, p=');

U=rand(n,N);
X=sum(U<p);

k=0:n;
p_k=binopdf(k,n,p);
U_X = unique(X);
n_X = hist(X,length(U_X));
rel_freq = n_X/N;
plot(U_X,rel_freq,'*',k,p_k,'o')
