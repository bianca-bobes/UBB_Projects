#pragma once
#include "Domain.h"
#include <vector>
#include "Subject.h"
class Repository : public Subject
{
private:
	std::vector<Event> events;
	std::vector<Person> persons;
	std::vector<Observer*> observers;
public:
	Repository();
	~Repository();
	void addEvent(Event e);
	void addPerson(Person p);
	std::vector<Event> getAllEvents() const { return this->events; };
	std::vector<Person> getAllPersons() const { return this->persons; };
	void addObserver(Observer* o) override { this->observers.push_back(o); };
	void notify() override;
	void readPersons();
	void readEvents();
	void writePersons();
	void writeEvents();
	std::vector<Event> sortEventsByDate();
};

