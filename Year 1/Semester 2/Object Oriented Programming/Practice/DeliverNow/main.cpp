#include "DeliverNow.h"
#include <QtWidgets/QApplication>
#include "Service.h"
#include "CourierView.h"
#include "CompanyView.h"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    
    CourierRepository c{};
    PackageRepository p{};
    Service s{ c, p };
    auto couriers = s.getAllCouriers();
    auto packages = s.getAllPackages();

    std::vector<CourierView*> views;
    for (auto c : couriers)
    {
        std::vector<Package> zonePackages;
        for (auto p : packages)
        {
            std::vector<std::string> zoneStreets = c.getStreets();
            int found = 0;
            for (auto s : zoneStreets)
            {
                if (s == p.getAddress().street)
                {
                    found = 1;
                }
            }
            if (found == 1)
            {
                if(p.getDeliveryStatus() == 0)
                    zonePackages.push_back(p);
            }
            else
            {
                int dist = sqrt(pow(p.getX() - c.getZone().centerX, 2) - pow(p.getY() - c.getZone().centerY, 2));
                if (dist < c.getZone().radius)
                {
                    if (p.getDeliveryStatus() == 0)
                        zonePackages.push_back(p);
                }
            }
        }
        CourierView* view = new CourierView{ zonePackages, c};
        views.push_back(view);
    }

    for (auto v : views)
    {
        v->show();
    }
    
    CompanyView cv{ s };
    cv.show();

    return a.exec();
}
