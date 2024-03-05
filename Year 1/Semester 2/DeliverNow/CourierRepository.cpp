#include "CourierRepository.h"
#include <fstream>
#include <sstream>
using std::getline;

std::vector<Courier> CourierRepository::getAllCouriers()
{
    return this->couriers;
}

void CourierRepository::addCourier(Courier c)
{
    this->couriers.push_back(c);
}

void CourierRepository::readFile()
{
    std::ifstream file(this->fileName);
    std::string line;
    while (getline(file, line))
    {
        std::string name, centerX, centerY, radius, street, streetsString;
        std::stringstream ss(line);
        std::getline(ss, name, '|');
        std::getline(ss, centerX, '|');
        std::getline(ss, centerY, '|');
        std::getline(ss, radius, '|');
        Zone z;
        z.centerX = std::stoi(centerX);
        z.centerY = std::stoi(centerY);
        z.radius = std::stoi(radius);

        std::vector<std::string> streets;

        std::getline(ss, streetsString, '|');

        std::stringstream sa(streetsString);
        while (std::getline(sa, street, ';'))
        {
            streets.push_back(street);
        }

        Courier c{ name, streets, z };
        this->addCourier(c);
    }
}
