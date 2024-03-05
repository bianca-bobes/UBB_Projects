#ifndef DRIVECONNECT_CHATSESSION_H
#define DRIVECONNECT_CHATSESSION_H

#include <iostream>
#include <fstream>
#include <string>
#include "DriverMessage.h"
#include "Subject.h"

using namespace std;

class ChatSession : public Subject {
private:
    vector<DriverMessage> messages;

public:
    ChatSession() = default;
    void addMessage(string u, string m);
    vector<DriverMessage> getMessages()  { return messages; };
};


#endif //DRIVECONNECT_CHATSESSION_H
