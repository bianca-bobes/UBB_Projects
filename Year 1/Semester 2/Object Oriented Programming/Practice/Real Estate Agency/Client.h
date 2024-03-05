//
// Created by biabo on 5/11/2023.
//

#ifndef T2_BIANCA_BOBES_1_CLIENT_H
#define T2_BIANCA_BOBES_1_CLIENT_H
#include "Dwelling.h"
#include <string>

class Client {
protected:
    std::string name;
    double income;
public:
    Client(const std::string &name, double income) : name{name}, income{income} {}
    std::string getName() const { return this->name; }
    virtual double totalIncome() { return this->income; }
    virtual std::string toString();
    virtual bool isInterested(Dwelling d) { return false; }

};

class Person : public Client{
    bool isInterested(Dwelling d) override;

public:
    Person(const std::string& name, double income): Client{name,income} {}
};

class Company : public Client{
    double moneyFromInvestments;
public:
    Company(const std::string& name,double income,double money): Client{name,income},moneyFromInvestments{money} {};
    bool isInterested(Dwelling d) override;
    std::string toString() override;
    double totalIncome() override {return this->income + this->moneyFromInvestments;}
};

#endif //T2_BIANCA_BOBES_1_CLIENT_H
