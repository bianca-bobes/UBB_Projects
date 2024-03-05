//
// Created by biabo on 5/11/2023.
//

#include "RealEstateAgency.h"
#include <algorithm>


RealEstateAgency::RealEstateAgency() {
    Client* p1= new Person{"Bianca",2300};
    Client* p2 = new Person{"Badeea",4000};
    Client* c1 = new Company{"tech",40000,300};
    Client* c2 = new Company{"trade",10000,400};
    this->clients.push_back(p1);
    this->clients.push_back(p2);
    this->clients.push_back(c1);
    this->clients.push_back(c2);
    Dwelling d1{2400,1};
    this->dwellings.push_back(d1);
}

Dwelling RealEstateAgency::addDwelling(double price, bool isProfitable) {
    Dwelling d = Dwelling(price,isProfitable);
    this->dwellings.push_back(d);
    return d;

}

int RealEstateAgency::removeClient(std::string name) {
    int index=-1;
    for(int i=0;i<clients.size();i++)
    {
        if(clients[i]->getName()==name)
            index = i;
    }
    if(index==-1)
        return -1;
    else
        delete clients[index];

}

std::vector<Client> RealEstateAgency::getInterestedClients(Dwelling d) {
    std::vector<Client> result;
    for(auto it: this->clients)
    {
        if(it->isInterested(d))
            result.push_back(*it);
    }
    return result;
}
