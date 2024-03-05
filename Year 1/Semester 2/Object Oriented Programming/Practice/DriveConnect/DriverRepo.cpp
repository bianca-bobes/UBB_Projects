#include "DriverRepo.h"
#include <sstream>

DriverRepo::DriverRepo(string filePath) {
    this->currentIndex = 0;
    this->filePath = filePath;
    this->readDriverFile();
}

vector<string> DriverRepo::tokenize_string2(string stringToSplit, char delimiter)
{
    vector<string> result;
    std::stringstream ss(stringToSplit);
    string token;
    while (std::getline(ss, token, delimiter))
        result.push_back(token);

    return result;
}

void DriverRepo::readDriverFile() {
    std::ifstream file(this->filePath);
    if(!file.is_open())
        throw std::exception();
    string currentDriver;
    while(getline(file, currentDriver)){
        vector<string> tokens = this->tokenize_string2(currentDriver, ',');
        if(tokens.size() != 4)
            continue;
        Driver d1{ tokens[0], stoi(tokens[1]), stoi(tokens[2]), stoi(tokens[3]) };

        this->addDriver(d1);
    }
    file.close();
}

void DriverRepo::addDriver(Driver new_driver) {
    this->driver_database.push_back(new_driver);
    this->currentIndex++;
}

vector<Driver> &DriverRepo::get_all_drivers() {
    return this->driver_database;
}

int DriverRepo::get_driver_idx() {
    return this->currentIndex;
}

