#pragma once

#include <QtWidgets/QMainWindow>
#include "ui_TestLab12.h"
#include "Service.h"

class TestLab12 : public QMainWindow
{
    Q_OBJECT

public:
    TestLab12(Service& serv,QWidget *parent = nullptr);
    ~TestLab12();

private:
    Ui::TestLab12Class ui;
    Service& serv;
    void populate();
};
