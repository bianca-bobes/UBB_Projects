#ifndef DRIVECONNECT_SERVICE_H
#define DRIVECONNECT_SERVICE_H

#include "Subject.h"
#include <vector>
#include <iostream>
#include "ReportRepo.h"
#include "DriverRepo.h"

using namespace std;

///the service class inherits from the subject class
class Service : public Subject{
private:
    ReportRepo& reportRepo;
    DriverRepo& driverRepo;

public:
    Service(ReportRepo& reportRepo, DriverRepo& driverRepo);

    ///implement functions that return a reference to the 2 repositories

    vector<Report>& get_all_reports() { return reportRepo.get_all_reports(); }
    vector<Driver>& get_all_drivers() { return driverRepo.get_all_drivers(); }

    int get_index_driver() { return driverRepo.get_driver_idx(); }
    int get_index_report() { return reportRepo.get_report_idx(); }

    int get_index_driver_by_name(string name);

    bool compare_distances(Driver d1, Report r1);

    string add_message(string u, string m);

    void validate_report_service(string description, string reporter_name, int latitude, int longitude, string validation_status);

    void add_report_service(string description, string reporter_name, int latitude, int longitude, string validation_status);

    void update_score(string name);

};


#endif //DRIVECONNECT_SERVICE_H
