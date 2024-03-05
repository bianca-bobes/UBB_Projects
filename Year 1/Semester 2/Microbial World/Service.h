#pragma once
#include "Repository.h"
class Service
{
private:
	Repository& repo;
public:
	Service(Repository& repo);
	std::vector<Biologist> getAllBiologists();
	std::vector<Bacterium> getAllBacteria();
	void addBacteria(Bacterium b);
	void sortVector();


};

