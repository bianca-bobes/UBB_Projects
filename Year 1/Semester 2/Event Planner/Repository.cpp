#include "Repository.h"
#include <fstream>
#include <sstream>
#include <algorithm>

Repository::Repository()
{
	this->readEvents();
	this->readPersons();
}

Repository::~Repository()
{
	this->writeEvents();
	this->writePersons();
}

void Repository::addEvent(Event e)
{
	this->events.push_back(e);
	this->notify();
}

void Repository::addPerson(Person p)
{
	this->persons.push_back(p);
	this->notify();
}

void Repository::notify()
{
	for (auto o : this->observers)
		o->update();
}

void Repository::readPersons()
{
	std::ifstream f("persons.txt");
	std::string line;
	while (std::getline(f, line))
	{
		std::stringstream ss(line);
		std::string name, latitude, longitude,organiserstatus;
		std::getline(ss, name, ',');
		std::getline(ss, latitude, ',');
		std::getline(ss, longitude, ',');
		std::getline(ss, organiserstatus, ',');
		double lat = std::stod(latitude);
		double lon = std::stod(longitude);
		bool org = std::stoi(organiserstatus);
		Location l{ lat,lon };
		Person p{ name,l,org };
		this->persons.push_back(p);
	}
	f.close();
}

void Repository::readEvents()
{
	std::ifstream f("events.txt");
	std::string line;
	while (std::getline(f, line))
	{
		std::stringstream ss(line);
		std::string organiser, name, description, latitude, longitude, day, month, year;
		std::getline(ss, organiser, ',');
		std::getline(ss, name, ',');
		std::getline(ss, description, ',');
		std::getline(ss, latitude, ',');
		std::getline(ss, longitude, ',');
		std::getline(ss, day, '.');
		std::getline(ss, month, '.');
		std::getline(ss, year, '.');
		double lat = std::stod(latitude);
		double lon = std::stod(longitude);
		int d = std::stoi(day);
		int m = std::stoi(month);
		int y = std::stoi(year);
		Location l{ lat,lon };
		Date date{ d,m,y };
		Event e{ organiser,name,description,l,date };
		this->events.push_back(e);
	}
	f.close();
}

void Repository::writePersons()
{
	std::ofstream f("persons.txt");
	for (auto p : this->persons)
	{
		f << p.to_String() << "\n";
	}
	f.close();
}

void Repository::writeEvents()
{
	std::ofstream f("events.txt");
	for (auto e : this->events)
	{
		f << e.to_String() << "\n";
	}
	f.close();
}

std::vector<Event> Repository::sortEventsByDate()
{

	std::vector<Event> v = this->events;
	//sort by date
	std::sort(v.begin(), v.end(), [](Event e1, Event e2) {return e1 < e2; });
	return v;

}
