#pragma once
#include "Domain.h"
class Repository
{
private:
	std::vector<Biologist> biologists;
	std::vector<Bacterium> bacteria;
public:
	Repository();
	std::vector<Biologist> getAllBiologists();
	std::vector<Bacterium> getAllBacteria();
	void addBacterium(Bacterium b);
	void readBiologists();
	void readBacteria();
	void writeBacteria();
	void sortBacteria();
	~Repository();

};

