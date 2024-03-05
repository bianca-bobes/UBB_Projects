#include "Restanta.h"
#include <QtWidgets/QApplication>
#include "PersonWindow.h"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    //Restanta w;
   // w.show();
    Repository repo{};
    Service serv{ repo };
   std::vector<PersonWindow*> windows;
   for (auto p : serv.getAllPersons())
   {
       PersonWindow* w = new PersonWindow{ serv,p.getName() };
       serv.addObserver(w);
	   w->show();
	   windows.push_back(w);
   }

    return a.exec();
}
