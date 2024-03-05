#include "Package.h"

Package::Package(std::string r, Address a, int x, int y, bool ds) : recipient{r}, address{a}, x{x}, y{y}, deliveryStatus{ds}
{
}

std::string Package::toString()
{
	return this->recipient + "|" + this->address.street + " " + std::to_string(this->address.number);
}
