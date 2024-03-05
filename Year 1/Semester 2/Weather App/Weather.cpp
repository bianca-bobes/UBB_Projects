#include "Weather.h"
#include <string>
#include <sstream>
#include <vector>
#include <istream>
#include <algorithm>

Weather::Weather()
{
	this->hstart = 0;
	this->hend = 0;
	this->temperature = 0;
	this->pprob = 0;
	this->description = "";
}

Weather::Weather(int hstart, int hend, int temperature, int pprob, std::string description)
{
	this->hstart = hstart;
	this->hend = hend;
	this->temperature = temperature;
	this->pprob = pprob;
	this->description = description;
}

std::string Weather::toString() const
{
    std::stringstream ss;
    ss << "Interval " << "( " << this->hstart << ";" << this->hend << " )" << " , temperature: " << this->temperature << ", precipitations possibility: " << this->pprob << ", description: " << this->description;
    return ss.str();
}

bool Weather::operator<(Weather w1) const
{
	return this->hstart < w1.hstart;
}

std::istream& operator>>(std::istream& reader, Weather& w)
{
    std::string line;
    std::getline(reader, line);

    if (line.empty())
        return reader;

    std::stringstream ss{ line };
    std::string token;
    std::vector<std::string> res;
    while (std::getline(ss, token, ';')) {
        res.push_back(token);
    }
    if (res.size() != 5)
        return reader;

    w.hstart = std::stoi(res[0]);
    w.hend = std::stoi(res[1]);
    w.temperature = std::stoi(res[2]);
    w.pprob = std::stoi(res[3]);
    w.description = res[4];

    return reader;
}
