#ifndef DRIVECONNECT_MAPPINGWINDOW_H
#define DRIVECONNECT_MAPPINGWINDOW_H

#include <QWidget>
#include <QPainter>
#include "Service.h"


QT_BEGIN_NAMESPACE
namespace Ui { class mappingwindow; }
QT_END_NAMESPACE

class mappingwindow : public QWidget {
Q_OBJECT

public:
    explicit mappingwindow(Service& serv ,QWidget *parent = nullptr);

    void paintEvent(QPaintEvent *event) override;

    ~mappingwindow() override;

private:
    Ui::mappingwindow *ui;
    Service &service;
};


#endif //DRIVECONNECT_MAPPINGWINDOW_H
