#ifndef DRIVECONNECT_OBSERVER_H
#define DRIVECONNECT_OBSERVER_H


class Observer {
public:
    virtual void update() = 0; ///pure virtual function that will be used in the .ui classes
};


#endif //DRIVECONNECT_OBSERVER_H
