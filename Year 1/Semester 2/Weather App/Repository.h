#pragma once
#include "Weather.h"
#include <string>
#include <vector>


class Repository
{
private:
	std::string fileName;
	std::vector<Weather> data;
public:
	Repository(std::string f);
	void loadFromFile();
	void addRepo(Weather w);
	void SortList();
	std::vector<Weather> getIntervals() { return data; }

};

