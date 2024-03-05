#include "Repository.h"
#include <fstream>
#include <sstream>
#include <algorithm>

Repository::Repository()
{
	this->readBiologists();
	this->readBacteria();

}

std::vector<Biologist> Repository::getAllBiologists()
{
	return this->biologists;
}

std::vector<Bacterium> Repository::getAllBacteria()
{
	return this->bacteria;
}

void Repository::addBacterium(Bacterium b)
{/*
	auto it = std::find(bacteria.begin(), bacteria.end(), b.getName());
	if (it != bacteria.end())
	{
		throw std::exception("Already exist bacteria with this name.");
	}
	else	
	{	auto i = std::find(bacteria.begin(), bacteria.end(), b.getSpecie());
		if (i != bacteria.end())
			throw std::exception("Already exist bacteria with this species.");
		
		else
			this->bacteria.push_back(b);
	}*/
	this->bacteria.push_back(b);

	
}

void Repository::readBiologists()
{
	std::ifstream file("biologists.txt");
	std::string line;
	while (getline(file, line))
	{
		std::string name, specie, speciesstring;
		std::stringstream ss(line);
		std::getline(ss, name, ',');
		std::vector<std::string> species;
		std::getline(ss, speciesstring, ',');
		std::stringstream sa(speciesstring);
		while (getline(sa, specie, '|'))
		{
			species.push_back(specie);
		}
		Biologist b{ name,species };
		this->biologists.push_back(b);

	}
}

void Repository::readBacteria()
{
	std::ifstream file("bacteria.txt");
	std::string line;
	while (getline(file, line))
	{
		std::string name, specie, size,disease,diseasestring;
		std::stringstream ss(line);
		std::getline(ss, name, ',');
		std::getline(ss, specie, ',');
		std::getline(ss, size, ',');
		std::vector<std::string> diseases;
		std::getline(ss, diseasestring, ',');
		std::stringstream sa(diseasestring);
		while (getline(sa, disease, '|'))
		{
			diseases.push_back(disease);
		}
		int S = std::stoi(size);
		Bacterium b{ name,specie,S,diseases };
		this->bacteria.push_back(b);

	}
}

void Repository::writeBacteria()
{
	std::ofstream fileOut("bacteria.txt");
	for (auto b : this->bacteria)
		fileOut << b.to_string() << "\n";
	fileOut.close();
}

void Repository::sortBacteria()
{
	sort(this->bacteria.begin(), this->bacteria.end(), [](const Bacterium& b1, const Bacterium& b2)
		{return b1.getName() < b2.getName(); });
}

Repository::~Repository()
{
	this->writeBacteria();
}
