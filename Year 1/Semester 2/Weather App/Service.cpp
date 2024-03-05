#include "Service.h"

Service::Service(Repository& r) : repo{ r }
{
}

void Service::addServ(int hstart, int hend, int temperature, int pprob, std::string description)
{
	Weather w{ hstart,hend,temperature,pprob,description };
	this->repo.addRepo(w);
}

void Service::Sort()
{
	this->repo.SortList();
}
