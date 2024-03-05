#include "Domain.h"

Event::Event()
{

}

Event::Event(std::string organiser, std::string name, std::string description, Location location, Date date)
{
	this->organiser = organiser;
	this->name = name;
	this->description = description;
	this->location = location;
	this->date = date;

}

Event::Event(const Event& e)
{
	this -> organiser = e.organiser;
	this->name = e.name;
	this->description = e.description;
	this->location = e.location;
	this->date = e.date;

}

std::string Event::to_String()
{
	std::string s = "";
	s += this->organiser + "," + this->name + "," + this->description + "," + std::to_string(this->location.latitude) + "," + std::to_string(this->location.longitude) + "," + std::to_string(this->date.day) + "." + std::to_string(this->date.month) + "." + std::to_string(this->date.year);
	return s;
}

bool Event::operator<(const Event& e) const
{
	if (this->date.year < e.date.year)
		return true;
	if (this->date.year == e.date.year && this->date.month < e.date.month)
		return true;
	if (this->date.year == e.date.year && this->date.month == e.date.month && this->date.day < e.date.day)
		return true;
	return false;
}


Person::Person()
{
}

Person::Person(std::string name, Location location, bool organiserstatus)
{
	this->name = name;
	this->location = location;
	this->organiserstatus = organiserstatus;
}

std::string Person::to_String()
{
	std::string s = "";
	s += this->name + "," + std::to_string(this->location.latitude) + "," + std::to_string(this->location.longitude) + "," + std::to_string(this->organiserstatus);
	return s;
}

bool Person::operator==(const Person& p) const
{
	return this->name == p.name;
}

bool Person::operator!=(const Person& p) const
{
	return this->name != p.name;
}
