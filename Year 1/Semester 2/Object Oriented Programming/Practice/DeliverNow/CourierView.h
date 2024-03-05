#pragma once

#include <QMainWindow>
#include "ui_CourierView.h"
#include "Service.h"
#include <set>

class CourierView : public QMainWindow
{
	Q_OBJECT

public:
	CourierView(std::vector<Package> p, Courier c, QWidget *parent = nullptr);
	~CourierView();
	void populatePackagesList(std::vector<Package> packages);

private:
	Ui::CourierViewClass ui;
	std::vector<Package> packages;
	Courier courier;
	void populateComboBox();
	void handleAddressSelection();
	void deliver();
};
