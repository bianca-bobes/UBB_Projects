#include "PersonWindow.h"
#include <QMessageBox>
#include <QTableWidget>

PersonWindow::PersonWindow(Service& serv, std::string userName,QWidget *parent)
	: QMainWindow(parent) , serv{serv}, userName{userName}
{
	ui.setupUi(this);
	this->setWindowTitle(QString::fromStdString(userName));
	this->populateLocation();
	this->populateEvents();
	this->manageCheckBox();
	this->connectSignals();
}

PersonWindow::~PersonWindow()
{}

void PersonWindow::populateLocation()
{
	//populate list widget with current person location
	Person p = this->serv.getPersonByName(this->userName);
	Location l = p.getLocation();
	//populate list widget with current person location
	//string loc latitude, longitude
	std::string loc = std::to_string(l.latitude) + "," + std::to_string(l.longitude);
	ui.cPErsonLoclistWidget->clear();
	ui.cPErsonLoclistWidget->addItem(QString :: fromStdString(loc));

}

void PersonWindow::populateEvents()
{
	//populate table widget with all events sorted by date without the description and for organisers , the events they organise with green background
	ui.EventstableWidget->clear();
	ui.EventstableWidget->setRowCount(0);
	ui.EventstableWidget->setColumnCount(4);
	ui.EventstableWidget->setHorizontalHeaderItem(0, new QTableWidgetItem("Organiser"));
	ui.EventstableWidget->setHorizontalHeaderItem(1, new QTableWidgetItem("Name"));
	ui.EventstableWidget->setHorizontalHeaderItem(2, new QTableWidgetItem("Location"));
	ui.EventstableWidget->setHorizontalHeaderItem(3, new QTableWidgetItem("Date"));

	std::vector<Event> events = this->serv.getAllEvents();
	events = this->serv.sortEventsByDate();
	int row = 0;
	for (auto e : events)
	{
		ui.EventstableWidget->insertRow(row);
		ui.EventstableWidget->setItem(row, 0, new QTableWidgetItem(QString::fromStdString(e.getOrganiser())));
		ui.EventstableWidget->setItem(row, 1, new QTableWidgetItem(QString::fromStdString(e.getName())));
		Location l = e.getLocation();
		std::string loc = std::to_string(l.latitude) + "," + std::to_string(l.longitude);
		ui.EventstableWidget->setItem(row, 2, new QTableWidgetItem(QString::fromStdString(loc)));
		Date d = e.getDate();
		std::string date = std::to_string(d.day) + "." + std::to_string(d.month) + "." + std::to_string(d.year);
		ui.EventstableWidget->setItem(row, 3, new QTableWidgetItem(QString::fromStdString(date)));
		if (e.getOrganiser() == this->userName)
		{
			ui.EventstableWidget->item(row, 0)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 1)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 2)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 3)->setBackground(Qt::green);
		}
		row++;
	}


}

void PersonWindow::checkboxnearEvents()
{
	//when the checkbox is checked, the table widget will show only the events that are near the person(5 units away euclidian distance)
	//unchecked, the table widget will show all events
	ui.EventstableWidget->clear();
	ui.EventstableWidget->setRowCount(0);
	ui.EventstableWidget->setColumnCount(4);
	ui.EventstableWidget->setHorizontalHeaderItem(0, new QTableWidgetItem("Organiser"));
	ui.EventstableWidget->setHorizontalHeaderItem(1, new QTableWidgetItem("Name"));
	ui.EventstableWidget->setHorizontalHeaderItem(2, new QTableWidgetItem("Location"));
	ui.EventstableWidget->setHorizontalHeaderItem(3, new QTableWidgetItem("Date"));
	std::vector<Event> events = this->serv.getAllEvents();
	events = this->serv.getEventsNearPerson(this->serv.getPersonByName(this->userName));
	int row = 0;
	for (auto e : events)
	{
		ui.EventstableWidget->insertRow(row);
		ui.EventstableWidget->setItem(row, 0, new QTableWidgetItem(QString::fromStdString(e.getOrganiser())));
		ui.EventstableWidget->setItem(row, 1, new QTableWidgetItem(QString::fromStdString(e.getName())));
		Location l = e.getLocation();
		std::string loc = std::to_string(l.latitude) + "," + std::to_string(l.longitude);
		ui.EventstableWidget->setItem(row, 2, new QTableWidgetItem(QString::fromStdString(loc)));
		Date d = e.getDate();
		std::string date = std::to_string(d.day) + "." + std::to_string(d.month) + "." + std::to_string(d.year);
		ui.EventstableWidget->setItem(row, 3, new QTableWidgetItem(QString::fromStdString(date)));
		if (e.getOrganiser() == this->userName)
		{
			ui.EventstableWidget->item(row, 0)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 1)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 2)->setBackground(Qt::green);
			ui.EventstableWidget->item(row, 3)->setBackground(Qt::green);
		}
		row++;
	}



}

void PersonWindow::manageCheckBox()
{
	if (ui.NearcheckBox->isChecked())
	{
		this->checkboxnearEvents();
	}
	else
	{
		this->populateEvents();
	}
}

void PersonWindow::connectSignals()
{
	QObject::connect(ui.NearcheckBox, &QCheckBox::stateChanged, this, &PersonWindow::manageCheckBox);
	QObject::connect(ui.ADDpushButton, &QPushButton::clicked, this, &PersonWindow::handleAddEventbyOrganiser);
	QObject::connect(ui.UpdatepushButton, &QPushButton::clicked, this, &PersonWindow::handleUpdateEventbyOrganiserDescriptionLocation);
}

void PersonWindow::handleAddEventbyOrganiser()
{
	//only organizers can add events
	std::string organiser = this->userName;
	std::string name = ui.NamelineEdit->text().toStdString();
	std::string description = ui.DescriptionlineEdit->text().toStdString();
	std::string latitude = ui.LatitudelineEdit->text().toStdString();
	std::string longitude = ui.LongitudelineEdit->text().toStdString();
	std::string location = latitude + "," + longitude;
	std::string day = ui.DaylineEdit->text().toStdString();
	std::string month = ui.MonthlineEdit->text().toStdString();
	std::string year = ui.YearlineEdit->text().toStdString();
	std::string date = day + "." + month + "." + year;
	Person p = this->serv.getPersonByName(this->userName);
	if (p.getOrganiserStatus() == 1)
	{
		if (name == "")
		{
			QMessageBox::critical(this, "Error", "Name cannot be empty");
			return;
		}
		else if (latitude == "")
		{
			QMessageBox::critical(this, "Error", "Latitude cannot be empty");
			return;
		}
		else if (longitude == "")
		{
			QMessageBox::critical(this, "Error", "Longitude cannot be empty");
			return;
		}
		else
		{
			Location l;
			l.latitude = std::stod(latitude);
			l.longitude = std::stod(longitude);	
			Date d;
			d.day = std::stoi(day);
			d.month = std::stoi(month);
			d.year = std::stoi(year);
			Event e = Event(organiser, name,description, l, d);
			this->serv.addEvent(e);
			this->populateEvents();
		}

	}
	else
	{
		QMessageBox::critical(this, "Error", "You are not an organiser");
		return;
	}


}

void PersonWindow::handleUpdateEventbyOrganiserDescriptionLocation()
{
	//organisers can update the description and/or date of an event
	std::string description = ui.UDescriptionlineEdit->text().toStdString();
	std::string day = ui.UDaylineEdit->text().toStdString();
	std::string month = ui.UMonthlineEdit->text().toStdString();
	std::string year = ui.UYearlineEdit->text().toStdString();
	std::string date = day + "." + month + "." + year;

	Person p = this->serv.getPersonByName(this->userName);
	if (p.getOrganiserStatus() == 1)
	{
		
			Date d;
			d.day = std::stoi(day);
			d.month = std::stoi(month);
			d.year = std::stoi(year);
			this->serv.updateEvent(p.getName(),description,d);
			this->populateEvents();
	}
	else
	{
		QMessageBox::critical(this, "Error", "You are not an organiser");
		return;

	}
}

void PersonWindow::update()
{
	this->populateEvents();
}
