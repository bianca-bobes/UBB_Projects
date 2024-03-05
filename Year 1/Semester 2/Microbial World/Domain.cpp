#include "Domain.h"

Biologist::Biologist(std::string name, std::vector<std::string> specieslist)
{
	this->name = name;
	this->specieslist = specieslist;
}

Biologist::Biologist(const Biologist& other)
{
	this->name = other.name;
	this->specieslist = other.specieslist;
}

Bacterium::Bacterium(std::string name, std::string specie, int size, std::vector<std::string> diseases)
{
	this->name = name;
	this->specie = specie;
	this->size = size;
	this->diseases = diseases;
}

Bacterium::Bacterium(const Bacterium& other)
{
	this->name = other.name;
	this->specie = other.specie;
	this->size = other.size;
	this->diseases = other.diseases;
}

std::string Bacterium::to_string()
{
	std::string result = name + "," + specie + "," + std::to_string(size) + ",";
	for (const auto& disease : diseases) {
		result += disease + ",";
	}
	return result;
}
