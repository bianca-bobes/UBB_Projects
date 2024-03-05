#ifndef DRIVECONNECT_DRIVERREPO_H
#define DRIVECONNECT_DRIVERREPO_H

#include <iostream>
#include "Driver.h"
#include <vector>
#include <algorithm>
#include <fstream>

using namespace std;


class DriverRepo {
    ///implement just like for the report
private:
    vector<Driver> driver_database;
    int currentIndex;
    string filePath;
public:
DriverRepo(string filePath);

    void readDriverFile();
    void addDriver(Driver new_driver);
    vector<Driver>& get_all_drivers();
    int get_driver_idx();



    vector<string> tokenize_string2(string stringToSplit, char delimiter);

};


#endif //DRIVECONNECT_DRIVERREPO_H
