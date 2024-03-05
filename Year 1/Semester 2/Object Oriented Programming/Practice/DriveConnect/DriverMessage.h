#ifndef DRIVECONNECT_DRIVERMESSAGE_H
#define DRIVECONNECT_DRIVERMESSAGE_H

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class DriverMessage {
private:
    string message;
    string name;
public:
    DriverMessage() = default;
    DriverMessage(string name, string message) : name{name}, message{message} {};
    string getMessage() const { return message; };
    string getName() const { return name; };
    string toString() const { return name + ": " + message; };
};


#endif //DRIVECONNECT_DRIVERMESSAGE_H
