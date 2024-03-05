#include "Service.h"

Service::Service(Repository& repo): repo{repo}
{
}

std::vector<Biologist> Service::getAllBiologists()
{
	return this->repo.getAllBiologists();
}

std::vector<Bacterium> Service::getAllBacteria()
{
	return this->repo.getAllBacteria();
}

void Service::addBacteria(Bacterium b)
{
	this->repo.addBacterium(b);
}

void Service::sortVector()
{
	this->repo.sortBacteria();
}
