//
// Created by biabo on 5/11/2023.
//

#include "Client.h"
bool Person::isInterested(Dwelling d) {
    if(d.getPrice()/1000 <= this->income)
        return true;
    else
        return false;
}

bool Company::isInterested(Dwelling d) {
    if(d.getPrice()/100 <= this->income)
        return true;
    else
        return false;
}

std::string Company::toString() {
    std::string res;
    res="Company: " + this->name ;
    res+=", income: " + std::to_string(this->income) ;
    res+=", money from investments: "+ std::to_string(this->moneyFromInvestments);
    res+=", total income: "+ std::to_string(this->totalIncome());
    res+="\n";
    return res;
}

std::string Client::toString() {
    std::string res;
    res="Person: " + this->name;
    res+=", income: " + std::to_string(this->income);
    res+=", total income: "+ std::to_string(this->totalIncome());
    res+="\n";
    return res;
}


