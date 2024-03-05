#include "Exam.h"
#include <QtWidgets/QApplication>
#include "BiologistWindow.h"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
   // Exam w;
    std::vector<BiologistWindow*> biologistswindow;
    Repository repo;
    Service serv{ repo };
    for (auto i : repo.getAllBiologists())
        biologistswindow.push_back(new BiologistWindow{ serv,i.getName() });
    for (auto i : biologistswindow)
    {
        i->show();
    }
  
   // w.show();
    return a.exec();
}
