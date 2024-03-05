#pragma once
#include <string>
class Weather
{
private:
	int hstart;
	int hend;
	int temperature;
	int pprob;
	std::string description;
public:
	Weather();
	Weather(int hstart, int hend, int temperature, int pprob,std::string description);
	int getStart() { return hstart; }
	int getEnd() { return hend; }
	int getT() { return temperature; }
	int getPProb() { return pprob; }
	std::string getDesc() { return description; }
	std::string toString() const;
	bool operator<(Weather w1) const;
	friend std::istream& operator>>(std::istream& reader, Weather& w);


};

