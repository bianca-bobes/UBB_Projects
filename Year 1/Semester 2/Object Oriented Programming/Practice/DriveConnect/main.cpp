#include <QApplication>
#include <QPushButton>
#include "ReportRepo.h"
#include "DriverRepo.h"
#include "Service.h"
#include "driverwindow.h"
#include "ChatSession.h"
#include "mappingwindow.h"

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);

    ReportRepo reportRepo{ "reports.txt" };
    DriverRepo driverRepo{ "drivers.txt" };

    ChatSession chat = ChatSession{};

    Service service{ reportRepo, driverRepo };


    for (auto& driver : driverRepo.get_all_drivers())
    {
        auto driverWindow = new DriverWindow{ service, driver.get_name(), chat };

        service.addObserver(driverWindow);
        driverWindow->show();
    }

    mappingwindow mappingWindow1{ service };
    mappingWindow1.show();

    //comments to see if the opening of the file actually works
    //cout << driverRepo.get_driver_idx() << endl;
    //cout << reportRepo.get_report_idx();

    return QApplication::exec();
}
