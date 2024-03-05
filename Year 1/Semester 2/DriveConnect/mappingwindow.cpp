

// You may need to build the project (run Qt uic code generator) to get "ui_mappingwindow.h" resolved

#include "mappingwindow.h"
#include "ui_mappingwindow.h"


mappingwindow::mappingwindow(Service &serv, QWidget *parent) :
        service(serv),QWidget(parent), ui(new Ui::mappingwindow) {
    ui->setupUi(this);
}

mappingwindow::~mappingwindow() {
    delete ui;
}

void mappingwindow::paintEvent(QPaintEvent *event) {
    int x = 10;
    int y = 10;
    QPainter painter(this);
    for(auto &report : this->service.get_all_reports()){
        if(report.get_validation_status() == "True")
        {
            painter.setPen(Qt::black);
            painter.setBrush(Qt::red);
            QRect rect(x, y, 85, 70);
            painter.drawRect(rect);
            painter.drawText(rect, Qt::AlignCenter, QString::fromStdString(report.get_description() + " " + to_string(report.get_latitude()) + " " + to_string(report.get_longitude())));
            x = x + 70;
            y = y + 70;
        }
    }
}
