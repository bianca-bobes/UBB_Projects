#include "Service.h"
#include <cmath>

Service::Service(ReportRepo &reportRepo, DriverRepo &driverRepo) : reportRepo{reportRepo}, driverRepo{driverRepo} {}

int Service::get_index_driver_by_name(string name) {
    vector<Driver> drivers = this->get_all_drivers();
    for (int i = 0; i < drivers.size(); i++)
        if (drivers[i].get_name() == name)
            return i;
    return -1;
}

bool Service::compare_distances(Driver d1, Report r1) {
    ///if the driver is in 10 units radius of the report => return true

    if (abs(d1.get_latitude() - r1.get_latitude()) > 10 || abs(d1.get_longitude() - r1.get_longitude()) > 10)
        return false;
    return true;

}

void Service::add_report_service(string description, string reporter_name, int latitude, int longitude, string validation_status) {
    ///add a report to the repository
    Report r{description, reporter_name, latitude, longitude, validation_status};
    this->reportRepo.addReport(r);
    ///notify the observers
    this->notify();
}

void Service::validate_report_service(string description, string reporter_name, int latitude, int longitude,
                                      string validation_status) {

    ///validate a report
    Report r{description, reporter_name, latitude, longitude, validation_status};
    this->reportRepo.validate_report(description, reporter_name, latitude, longitude, validation_status);
    ///notify the observers
    this->notify();

}

void Service::update_score(string name)
{
    ///update the score of a driver
    vector<Driver> drivers = this->get_all_drivers();
    for (int i = 0; i < drivers.size(); i++)
        if (drivers[i].get_name() == name)
            drivers[i].set_score(drivers[i].get_score() + 1);
    ///notify the observers
    this->notify();
}
