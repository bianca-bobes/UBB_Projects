#include "Subject.h"

void Subject::notify() {
    for(auto obs : observers)
        obs->update();
}

void Subject::addObserver(Observer *obs) {
    this->observers.push_back(obs);
}

void Subject::removeObserver(Observer *obs) {
    auto it = std::find(observers.begin(), observers.end(), obs);
    if(it != observers.end())
        observers.erase(it);
}
