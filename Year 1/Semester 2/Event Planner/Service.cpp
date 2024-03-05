#include "Service.h"
void Service::addEvent(Event e)
{
	this->repo.addEvent(e);
}

void Service::addPerson(Person p)
{
	this->repo.addPerson(p);
}

Person Service::getPersonByName(std::string name)
{
	std::vector<Person> persons = this->repo.getAllPersons();
	for (auto p : persons)
	{
		if (p.getName() == name)
			return p;
	}
	return Person{};
}

std::vector<Event> Service::getEventsNearPerson(Person p)
{
	//sqrt((x1-x2)^2+(y1-y2)^2)
	std::vector<Event> events = this->repo.getAllEvents();
	std::vector<Event> result;
	for (auto e : events)
	{
		double x1 = e.getLatitude();
		double y1 = e.getLongitude();
		double x2 = p.getLatitude();
		double y2 = p.getLongitude();
		double distance = sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
		if (distance <= 5)
			result.push_back(e);
	}
	return result;
}

void Service::updateEvent(std::string name, std::string description, Date d)
{
	std::vector<Event> events = this->repo.getAllEvents();
	for (auto e : events)
	{
		if (e.getOrganiser() == name)
		{
			e.setDescription(description);
			e.setDate(d);
		}
	}
	this->notify();
}
