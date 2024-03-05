#pragma once
#include <string>
struct Address {
public:
	std::string street;
	int number;
};

class Package
{
private:
	std::string recipient;
	Address address;
	int x;
	int y;
	bool deliveryStatus;
public:
	Package(std::string r, Address a, int x, int y, bool ds);
	std::string getRecipient() { return this->recipient; }
	Address getAddress() { return this->address; }
	int getX() { return this->x; }
	int getY() { return this->y; }
	bool getDeliveryStatus() { return this->deliveryStatus; }
	void setDeliveryStatus(bool status) { this->deliveryStatus = status; }
	std::string toString();
};

