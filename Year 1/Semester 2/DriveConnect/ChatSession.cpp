#include "ChatSession.h"

void ChatSession::addMessage(string u, string m) {
    this->messages.push_back(DriverMessage(u, m));
    this->notify();
}
