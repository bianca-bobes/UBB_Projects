#pragma once
#include <vector>
#include "Package.h"


class PackageRepository
{
private:
	std::vector<Package> packages;
	std::string fileName = "packages.txt";
public:
	PackageRepository() { this->readFile(); }
	std::vector<Package> getAllPackages();
	void addPackage(Package c);
	void readFile();
};

