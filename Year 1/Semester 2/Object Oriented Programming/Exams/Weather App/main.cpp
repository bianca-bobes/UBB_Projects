#include "TestLab12.h"
#include <QtWidgets/QApplication>
#include "Repository.h"
#include "Service.h"
#include "Weather.h"

int main(int argc, char* argv[])
{
    QApplication a(argc, argv);
    Repository repo("file.txt");
    repo.loadFromFile();
    Service serv(repo);
    TestLab12 w(serv);
    w.show();
    return a.exec();
}
