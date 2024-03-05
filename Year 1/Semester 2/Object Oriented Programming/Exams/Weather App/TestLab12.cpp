#include "TestLab12.h"


TestLab12::TestLab12(Service& serv, QWidget *parent)
    : QMainWindow(parent), serv{serv}
{
    ui.setupUi(this);
    populate();
}

TestLab12::~TestLab12()
{}

void TestLab12::populate()
{
    this->serv.Sort();
    this->ui.WeatherlistWidget->clear();
    std::vector<Weather> data = this->serv.getData();
    for (auto i : data)
    {
        QString str = QString::fromStdString(i.toString());
        QListWidgetItem* item = new QListWidgetItem{ str };
        this->ui.WeatherlistWidget->addItem(item);

    }
}
