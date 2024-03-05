#pragma once

#include <QMainWindow>
#include "ui_PersonWindow.h"
#include "Service.h"

class PersonWindow : public QMainWindow , public Observer
{
	Q_OBJECT

public:
	PersonWindow(Service& serv,std::string userName,QWidget *parent = nullptr);
	~PersonWindow();
	void populateLocation();
	void populateEvents();
	void checkboxnearEvents();
	void manageCheckBox();
	void connectSignals();
	void handleAddEventbyOrganiser();
	void handleUpdateEventbyOrganiserDescriptionLocation();
	void update() override;

private:
	Ui::PersonWindowClass ui;
	Service& serv;
	std::string userName;

};
