#pragma once
#include <string>
#include <vector>
class Biologist
{
private:
	std::string name;
	std::vector<std::string> specieslist;
public:
	Biologist(std::string name, std::vector<std::string> specieslist);
	Biologist(const Biologist& other);
	std::string getName() const { return this->name; };
	std::vector<std::string> getSpecieslist() const { return this->specieslist; };


};

class Bacterium
{
private:
	std::string name;
	std::string specie;
	int size;
	std::vector<std::string> diseases;

public:
	Bacterium(std::string name, std::string specie, int size, std::vector<std::string> diseases);
	Bacterium(const Bacterium& other);
	std::string getName() const { return this->name; };
	std::string getSpecie() const { return this->specie; };
	int getSize() const { return this->size; };
	std::vector<std::string> getDiseases() const { return this->diseases; };
	std::string to_string();
	

};

