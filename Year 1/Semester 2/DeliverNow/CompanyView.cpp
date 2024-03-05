#include "CompanyView.h"

CompanyView::CompanyView(Service& s, QWidget *parent) : service{ s }, QMainWindow(parent)
{
	ui.setupUi(this);
	
	this->populatePackagesList();
	this->connectSignals();
}

CompanyView::~CompanyView()
{}

void CompanyView::addPackage()
{
	std::string recipient = this->ui.recipientLineEdit->text().toStdString();
	std::string street = this->ui.streetLineEdit->text().toStdString();
	int nr = this->ui.nrLineEdit->text().toInt();
	int x = this->ui.xLineEdit->text().toInt();
	int y = this->ui.yLineEdit->text().toInt();
	Address a{ street, nr };
	Package p{ recipient, a, x, y, 0 };
	this->service.addPackage(p);
	this->populatePackagesList();
}

void CompanyView::populatePackagesList()
{
	ui.packagesList->clear();
	auto packages = this->service.getAllPackages();
	for (auto p : packages)
	{
		QListWidgetItem* currentPackage = new QListWidgetItem{ QString::fromStdString(p.toString()) };
		ui.packagesList->addItem(currentPackage);
	}
}

void CompanyView::connectSignals()
{
	connect(ui.addPackageButton, &QPushButton::clicked, this, &CompanyView::addPackage);
}
