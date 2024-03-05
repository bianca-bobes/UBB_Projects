#ifndef DRIVECONNECT_SUBJECT_H
#define DRIVECONNECT_SUBJECT_H

#include <iostream>
#include <vector>
#include <algorithm>
#include "Observer.h"

using namespace std;

class Subject {
private:
    vector<Observer*> observers;
public:
    virtual ~Subject() {}
    void notify(); ///notifies that the observers should change
    void addObserver(Observer *obs);
    void removeObserver(Observer *obs);
};


#endif //DRIVECONNECT_SUBJECT_H
