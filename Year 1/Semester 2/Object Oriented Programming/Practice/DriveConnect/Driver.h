#ifndef DRIVECONNECT_DRIVER_H
#define DRIVECONNECT_DRIVER_H

#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>

using namespace std;

class Driver {
private:
    string name;
    int latitude;
    int longitude;
    int score;
public:
    ///implement setters getters constructors
    Driver() = default;
    Driver(string name, int latitude, int longitude, int score) : name(name), latitude(latitude), longitude(longitude), score(score) {}
    Driver(const Driver &driver) : name(driver.name), latitude(driver.latitude), longitude(driver.longitude), score(driver.score) {}
    ~Driver() = default;

    void set_name (string name) { this->name = name ;}
    void set_latitude (int latitude) { this->latitude = latitude ;}
    void set_longitude (int longitude) { this->longitude = longitude ;}
    void set_score (int score) { this->score = score ;}

    string get_name () { return this->name ;}
    int get_latitude () { return this->latitude ;}
    int get_longitude () { return this->longitude ;}
    int get_score () { return this->score ;}

};


#endif //DRIVECONNECT_DRIVER_H
