#pragma once
#include "Observer.h"
class Subject
{
	public:
	virtual void addObserver(Observer* o) = 0;
	virtual void notify() = 0;
};

