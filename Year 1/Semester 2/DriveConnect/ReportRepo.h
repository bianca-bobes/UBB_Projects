#ifndef DRIVECONNECT_REPORTREPO_H
#define DRIVECONNECT_REPORTREPO_H

#include <iostream>
#include <fstream>
#include "Report.h"
#include "Subject.h"

class ReportRepo {
private:
    vector<Report> report_database;
    int currentIndex;

    string filePath;
public:
    ReportRepo(string filePath);

    void readFile();
    void addReport(Report new_report);
    vector<Report>& get_all_reports();
    int get_report_idx();

    void validate_report(string description, string reporter_name, int latitude, int longitude, string validation_status);

    vector<string> tokenize_string(string stringToSplit, char delimiter);
    void saveFile();
};


#endif //DRIVECONNECT_REPORTREPO_H
