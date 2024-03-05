#pragma once
#include "CourierRepository.h"
#include "PackageRepository.h"
class Service
{
private:
	CourierRepository courierRepo;
	PackageRepository packageRepo;
public:
	Service(CourierRepository& c, PackageRepository& p) : courierRepo{c}, packageRepo{p} {}
	std::vector<Courier> getAllCouriers() { return courierRepo.getAllCouriers(); }
	std::vector<Package> getAllPackages() { return packageRepo.getAllPackages(); }
	void addPackage(Package p) { this->packageRepo.addPackage(p); }
};

