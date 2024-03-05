#pragma once
#include <string>
struct Location
{
	double latitude;
	double longitude;
};
struct Date
{
	int day;
	int month;
	int year;
};
class Event
{
private:
	std::string organiser;
	std::string name;
	std::string description;
	Location location;
	Date date;
public:
	Event();
	Event(std::string organiser, std::string name, std::string description, Location location, Date date);
	Event( const Event& e);
	std::string getOrganiser() const { return this->organiser; };
	std::string getName() const { return this->name; };
	std::string getDescription() const { return this->description; };
	Location getLocation() const { return this->location; };
	double getLatitude() const { return this->location.latitude; };
	double getLongitude() const { return this->location.longitude; };
	Date getDate() const { return this->date; };
	void setOrganiser(std::string organiser) { this->organiser = organiser; };
	void setName(std::string name) { this->name = name; };
	void setDescription(std::string description) { this->description = description; };
	void setLocation(Location location) { this->location = location; };
	void setDate(Date date) { this->date = date; };
	std::string to_String();
	//operator < get date
	bool operator<(const Event& e) const;

};


class Person
{
private:
	std::string name;
	Location location;
	bool organiserstatus;
public:
	Person();
	Person(std::string name, Location location, bool organiserstatus);
	std::string getName() const { return this->name; };
	Location getLocation() const { return this->location; };
	double getLatitude() const { return this->location.latitude; };
	double getLongitude() const { return this->location.longitude; };
	bool getOrganiserStatus() const { return this->organiserstatus; };
	void setName(std::string name) { this->name = name; };
	void setLocation(Location location) { this->location = location; };
	void setOrganiserStatus(bool organiserstatus) { this->organiserstatus = organiserstatus; };
	std::string to_String();
	bool operator==(const Person& p) const;
	bool operator!=(const Person& p) const;
};


