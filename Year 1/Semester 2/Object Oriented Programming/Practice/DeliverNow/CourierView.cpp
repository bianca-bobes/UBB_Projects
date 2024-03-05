#include "CourierView.h"

CourierView::CourierView(std::vector<Package> p, Courier c, QWidget* parent)
	: packages {p}, courier{ c }, QMainWindow(parent)
{
	ui.setupUi(this);
	this->setWindowTitle(QString::fromStdString(c.getName()));
	Zone zone = c.getZone();
	std::string zoneStr = "Center: (" + std::to_string(zone.centerX) + "," + std::to_string(zone.centerY) + "), radius: " + std::to_string(zone.radius);
	ui.zoneLabel->setText(QString::fromStdString(zoneStr));

	
	this->populatePackagesList(packages);
	this->populateComboBox();
	connect(this->ui.streetsComboBox, &QComboBox::currentIndexChanged, this, &CourierView::handleAddressSelection);
	connect(this->ui.deliverButton, &QPushButton::clicked, this, &CourierView::deliver);
}


CourierView::~CourierView()
{}

void CourierView::populatePackagesList(std::vector<Package> packages)
{
	ui.packagesList->clear();
	for (auto p : packages)
	{
		QListWidgetItem* currentPackage = new QListWidgetItem{ QString::fromStdString(p.toString()) };
		ui.packagesList->addItem(currentPackage);
	}
}

void CourierView::populateComboBox()
{
	this->ui.streetsComboBox->addItem(QString::fromStdString("All"));
	std::set<std::string> streets;
	for (auto p : packages)
	{
		streets.insert(p.getAddress().street);
	}
	for (auto s : streets)
	{
		this->ui.streetsComboBox->addItem(QString::fromStdString(s));
	}
}

void CourierView::handleAddressSelection()
{
	std::string streetFromCombo = this->ui.streetsComboBox->currentText().toStdString();
	if (streetFromCombo == "All")
	{
		this->populatePackagesList(packages);
		return;
	}
	std::vector<Package> packagesAtAddress;
	for (auto p : packages)
	{
		if (p.getAddress().street == streetFromCombo)
		{
			packagesAtAddress.push_back(p);
		}
	}
	this->populatePackagesList(packagesAtAddress);
}

void CourierView::deliver()
{
	std::string data = this->ui.packagesList->selectedItems()[0]->text().toStdString();
	std::string recipient;
	int i = 0;
	while (data[i] != '|')
	{
		recipient += data[i];
		i++;
	}
	std::vector<Package> packagesToDeliver;
	for (auto p : packages)
	{
		if (p.getRecipient() != recipient)
		{
			packagesToDeliver.push_back(p);
		}
	}
	packages = packagesToDeliver;
	this->populatePackagesList(packages);
}
