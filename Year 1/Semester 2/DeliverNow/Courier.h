#pragma once
#include <string>
#include <vector>
struct Zone {
public:
	int centerX;
	int centerY;
	int radius;
};
class Courier
{
private:
	std::string name;
	std::vector<std::string> streets;
	Zone zone;
public:
	Courier(std::string n, std::vector<std::string> s, Zone z);
	std::string getName() { return this->name; }
	std::vector<std::string> getStreets() { return this->streets; }
	Zone getZone() { return this->zone; }
};

