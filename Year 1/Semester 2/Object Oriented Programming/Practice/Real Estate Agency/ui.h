//
// Created by biabo on 5/11/2023.
//

#ifndef T2_BIANCA_BOBES_1_UI_H
#define T2_BIANCA_BOBES_1_UI_H
#include "RealEstateAgency.h"

class ui {
    RealEstateAgency& service;
public:
    ui(RealEstateAgency& srv): service{srv} {}
    void printMenu();
    void start();
    void remove();
    void add();
    void display();
};


#endif //T2_BIANCA_BOBES_1_UI_H
