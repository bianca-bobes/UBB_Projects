#pragma once
#include "Repository.h"
class Service
{
private:
	Repository& repo;
public:
	Service(Repository& repo) : repo{ repo } {};
	void addEvent(Event e);
	void addPerson(Person p);
	std::vector<Event> getAllEvents() const { return this->repo.getAllEvents(); };
	std::vector<Person> getAllPersons() const { return this->repo.getAllPersons(); };
	Person getPersonByName(std::string name);
	std::vector<Event> sortEventsByDate() { return this->repo.sortEventsByDate(); };
	std::vector<Event> getEventsNearPerson(Person p);
	void updateEvent(std::string name, std::string description, Date d);
	void addObserver(Observer* o) { this->repo.addObserver(o); };
	void notify() { this->repo.notify(); };
};

