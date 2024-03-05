#ifndef DRIVECONNECT_DRIVERWINDOW_H
#define DRIVECONNECT_DRIVERWINDOW_H

#include <QWidget>
#include "Observer.h"
#include "Service.h"
#include "ui_DriverWindow.h"
#include "ChatSession.h"
#include <QMessageBox>


QT_BEGIN_NAMESPACE
namespace Ui { class DriverWindow; }
QT_END_NAMESPACE

class DriverWindow : public QWidget, public Observer{
Q_OBJECT

public:
    DriverWindow(Service& service, string driverName, ChatSession& chat, QWidget *parent = Q_NULLPTR);

    void update() override;

    void showDriver(vector<Driver> drivers);

    void connectSignalsAndSlots();

    void sendMessage();

    void populate_chat_list();

    void validate_report();

    ~DriverWindow() override;

private:
    Ui::DriverWindow *ui;

    Service& serv;
    string driverName;
    ChatSession& chat;
};


#endif //DRIVECONNECT_DRIVERWINDOW_H
