#ifndef DRIVECONNECT_REPORT_H
#define DRIVECONNECT_REPORT_H

#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>

using namespace std;

class Report {
private:
    string description;
    string reporter; ///the driver which reported it
    int latitude;
    int longitude;
    string validation_status;
public:
    ///implement setters getters constructors
    Report() = default;
    Report(string description, string reporter, int latitude, int longitude, string validation_status) : description(description), reporter(reporter), latitude(latitude), longitude(longitude), validation_status(validation_status) {}
    Report(const Report &report) : description(report.description), reporter(report.reporter), latitude(report.latitude), longitude(report.longitude), validation_status(report.validation_status) {}
    ~Report() = default;

    void set_description (string description) { this->description = description ;}
    void set_reporter (string reporter) { this->reporter = reporter ;}
    void set_latitude (int latitude) { this->latitude = latitude ;}
    void set_longitude (int longitude) { this->longitude = longitude ;}
    void set_validation_status (string validation_status) { this->validation_status = "True" ;}

    string get_description () { return this->description ;}
    string get_reporter () { return this->reporter ;}
    int get_latitude () { return this->latitude ;}
    int get_longitude () { return this->longitude ;}
    string get_validation_status () { return this->validation_status ;}

    string toString()
    {
        return this->description + " " + this->reporter + " " + to_string(this->latitude) + " " + to_string(this->longitude) + " " + this->validation_status;
    }

};


#endif //DRIVECONNECT_REPORT_H
