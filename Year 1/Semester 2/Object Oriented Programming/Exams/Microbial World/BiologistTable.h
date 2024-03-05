#pragma once

#include <QMainWindow>
#include "ui_BiologistTable.h"
#include "Service.h"

class BiologistTable : public QMainWindow
{
	Q_OBJECT

public:
	BiologistTable(Service& serv , QWidget *parent = nullptr);
	~BiologistTable();
	void populateTable();
private:
	Ui::BiologistTableClass ui;
	Service& serv;
};
