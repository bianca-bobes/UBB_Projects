// You may need to build the project (run Qt uic code generator) to get "ui_DriverWindow.h" resolved

#include "driverwindow.h"
#include "ui_DriverWindow.h"
#include <sstream>


DriverWindow::DriverWindow(Service& service, string driver_name, ChatSession& session, QWidget *parent) :
        QWidget(parent), ui(new Ui::DriverWindow), serv{ service } , driverName{driver_name}, chat{session} {
    ui->setupUi(this);

    this->setWindowTitle(QString::fromStdString(driverName));

    this->showDriver(this->serv.get_all_drivers());
    this->populate_chat_list();
    this->connectSignalsAndSlots();
}

DriverWindow::~DriverWindow() {
    this->serv.removeObserver(this);
}

void DriverWindow::update() {
    this->ui->listWidget2->clear();
    for (auto &message : this->chat.getMessages()) {
        this->ui->listWidget2->addItem(QString::fromStdString(message.toString()));
    }

    this->showDriver(this->serv.get_all_drivers());

}

void DriverWindow::sendMessage() {
    int specific_index = this->serv.get_index_driver_by_name(driverName);
    Driver specific_driver = this->serv.get_all_drivers()[specific_index];

    string user = specific_driver.get_name();
    string text = this->ui->lineEdit->text().toStdString();

    vector<string> parameters;
    string parameter;
    stringstream ss(text);

    while (getline(ss, parameter, ' ')) {
        parameters.push_back(parameter);
    }

    ///if the input is a report
    if (parameters.size() == 3) {
        string description = parameters[0];
        string name = this->driverName;
        int latitude = stoi(parameters[1]);
        int longitude = stoi(parameters[2]);
        Report report{ description, name, latitude, longitude, "False" };
        this->serv.add_report_service(description, name, latitude, longitude, "False");
        this->serv.notify();
        text = report.toString();
        this->chat.addMessage(user, text);
        this->serv.notify();
        this->populate_chat_list();
    }

}

void DriverWindow::showDriver(vector<Driver> drivers) {
    this->ui->listWidget1->clear();
    drivers = this->serv.get_all_drivers();

    int specific_index = this->serv.get_index_driver_by_name(driverName);
    Driver specific_driver = drivers[specific_index];

    ///add to the list the latitude and the longitude

    this->ui->listWidget1->addItem(QString::fromStdString("Latitude: " + to_string(specific_driver.get_latitude())));
    this->ui->listWidget1->addItem(QString::fromStdString("Longitude: " + to_string(specific_driver.get_longitude())));

    ///add to the list the reports that are within a 10 units radius of the current location of the driver

    vector<Report> reports = this->serv.get_all_reports();
    for (auto report : reports) {
        if (this->serv.compare_distances(specific_driver, report)) {

            this->ui->listWidget1->addItem(QString::fromStdString(report.toString()));
            ///if the report is "True" => bold the specific report
            if (report.get_validation_status() == "True") {
                QListWidgetItem *item = this->ui->listWidget1->item(this->ui->listWidget1->count() - 1);
                QFont font = item->font();
                font.setBold(true);
                item->setFont(font);
            }

        }
    }
}

void DriverWindow::populate_chat_list() {
    ///function that goes through each driver window and adds the corresponding chat list

    this->ui->listWidget2->clear();
    for (auto &message : this->chat.getMessages()) {
        this->ui->listWidget2->addItem(QString::fromStdString(message.toString()));
    }

}

void DriverWindow::connectSignalsAndSlots() {
    QObject::connect(this->ui->pushButton, &QPushButton::clicked, this, &DriverWindow::sendMessage);
    ///connect the button to the function validate_report such that when an object is selected and the button is pushed it will modify it

    QObject::connect(this->ui->pushButton_2, &QPushButton::clicked, this, &DriverWindow::validate_report);
}

void DriverWindow::validate_report() {
    /*function that will validate a report
     * the report will be validated only if it is False and if the selected report is ACTUALLY OF TYPE REPORT
     * if the report is validated, the driver will be notified, the list will be updated, and score of the driver will be updated
     * make this through selecting the specific report(index)
     * */

    int specific_index = this->serv.get_index_driver_by_name(driverName);
    Driver specific_driver = this->serv.get_all_drivers()[specific_index];

    vector<Report> reports = this->serv.get_all_reports();
    int index = this->ui->listWidget1->currentRow() - 1;

    if (index >= 0 && index < reports.size()) {
        Report report = reports[index];
        if (report.get_validation_status() == "False") {
            this->serv.validate_report_service(report.get_description(), report.get_reporter(), report.get_latitude(), report.get_longitude(), "True");
            this->serv.notify();
            this->showDriver(this->serv.get_all_drivers());
            this->populate_chat_list();
            //this->serv.update_score_service(specific_driver.get_name(), specific_driver.get_score() + 1);
            //this->serv.notify();

            cout << this->serv.get_all_reports()[3].toString() << endl;
        }
    }
    else
        QMessageBox::critical(this, "Error", "No report selected!");

}

