#pragma once
#include "Repository.h"

class Service
{
private:
	Repository& repo;
public:
	Service(Repository& r);
	void addServ(int hstart, int hend, int temperature, int pprob, std::string description);
	std::vector<Weather> getData() { return repo.getIntervals(); };
	void Sort();
};

