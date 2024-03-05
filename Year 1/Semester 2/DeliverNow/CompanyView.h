#pragma once

#include <QMainWindow>
#include "ui_CompanyView.h"
#include "Service.h"

class CompanyView : public QMainWindow
{
	Q_OBJECT

public:
	CompanyView(Service& s, QWidget *parent = nullptr);
	~CompanyView();

private:
	Ui::CompanyViewClass ui;
	void addPackage();
	void populatePackagesList();
	void connectSignals();
	Service service;
};
