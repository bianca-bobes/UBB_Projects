#include "PackageRepository.h"
#include <fstream>
#include <sstream>

std::vector<Package> PackageRepository::getAllPackages()
{
	return this->packages;
}

void PackageRepository::addPackage(Package c)
{
	this->packages.push_back(c);
}

void PackageRepository::readFile()
{
	std::ifstream file(this->fileName);
	std::string line;
	while (getline(file, line))
	{
		std::string recipient, street, number, x, y, deliveryStatus;
		std::stringstream ss(line);
		std::getline(ss, recipient, '|');
		std::getline(ss, street, '|');
		std::getline(ss, number, '|');
		std::getline(ss, x, '|');
		std::getline(ss, y, '|');
		std::getline(ss, deliveryStatus, '|');
		Address adr;
		adr.street = street;
		adr.number = stoi(number);
		bool ds = 0;
		if (deliveryStatus == "1") {
			ds = 1;
		}
		Package p{ recipient, adr, stoi(x), stoi(y), ds};
		this->addPackage(p);
	}
}
