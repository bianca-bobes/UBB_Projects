#include "Repository.h"
#include <fstream>
#include <algorithm>

Repository::Repository(std::string f)
{
	this->fileName = f;
}

void Repository::loadFromFile()
{
	if (!fileName.empty())
	{
		Weather wf;
		std::ifstream inFile(fileName);
		while (inFile >> wf)
			this->data.push_back(wf);
		inFile.close();
	}
}

void Repository::addRepo(Weather w)
{
	this->data.push_back(w);
}

void Repository::SortList()
{
	std::sort(this->data.begin(), this->data.end());
}
