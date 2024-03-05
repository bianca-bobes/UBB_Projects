#pragma once

#include <QMainWindow>
#include "ui_BiologistWindow.h"
#include "Service.h"

class BiologistWindow : public QMainWindow
{
	Q_OBJECT

public:
	BiologistWindow(Service& serv,std::string userName,QWidget *parent = nullptr);
	~BiologistWindow();
	

private:
	Ui::BiologistWindowClass ui;
	Service& serv;
	std::string userName;

};
