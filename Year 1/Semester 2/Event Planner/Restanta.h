#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_Restanta.h"

class Restanta : public QMainWindow
{
    Q_OBJECT

public:
    Restanta(QWidget *parent = nullptr);
    ~Restanta();

private:
    Ui::RestantaClass ui;
};
