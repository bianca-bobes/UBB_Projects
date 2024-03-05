#include "ReportRepo.h"
#include <fstream>
#include <exception>
#include <algorithm>
#include <sstream>

ReportRepo::ReportRepo(std::string filePath) {
    this->filePath = filePath;
    this->currentIndex = 0;
    this->readFile();
}

vector<string> ReportRepo::tokenize_string(string stringToSplit, char delimiter)
{
    vector<string> result;
    stringstream ss(stringToSplit);
    string token;
    while (getline(ss, token, delimiter))
        result.push_back(token);

    return result;
}

void ReportRepo::readFile() {
    ifstream file(this->filePath);
    if(!file.is_open())
        throw std::exception();
    string currentReport;
    while(getline(file, currentReport)){
        vector<string> tokens = this->tokenize_string(currentReport, ',');
        if(tokens.size() != 5)
            continue;
        Report r1{ tokens[0], tokens[1], stoi(tokens[2]), stoi(tokens[3]), tokens[4] };

        this->addReport(r1);
    }
    file.close();

}

void ReportRepo::addReport(Report new_report) {
    this->report_database.push_back(new_report);
    this->currentIndex++;
    this->saveFile();
}

vector<Report>& ReportRepo::get_all_reports() {
    return this->report_database;
}

int ReportRepo::get_report_idx() {
    return this->currentIndex;
}

void ReportRepo::validate_report(string description, string reporter_name, int latitude, int longitude,
                                 string validation_status) {

    for(auto & i : this->report_database){
        if(i.get_description() == description && i.get_reporter() == reporter_name && i.get_latitude() == latitude && i.get_longitude() == longitude){
            i.set_validation_status(validation_status);
            return;
        }
    }

}

void ReportRepo::saveFile() {
    ofstream file(this->filePath);
    if(!file.is_open())
        throw std::exception();
    for(auto & i : this->report_database){
        file << i.get_description() << "," << i.get_reporter() << "," << i.get_latitude() << "," << i.get_longitude() << "," << i.get_validation_status() << "\n";
    }
    file.close();
}


