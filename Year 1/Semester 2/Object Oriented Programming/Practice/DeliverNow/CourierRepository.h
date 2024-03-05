#pragma once
#include <vector>
#include "Courier.h"

class CourierRepository
{
private:
	std::vector<Courier> couriers;
	std::string fileName = "couriers.txt";
public:
	CourierRepository() { this->readFile(); }
	std::vector<Courier> getAllCouriers();
	void addCourier(Courier c);
	void readFile();
};

