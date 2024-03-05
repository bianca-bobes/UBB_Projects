//
// Created by biabo on 5/11/2023.
//

#ifndef T2_BIANCA_BOBES_1_DWELLING_H
#define T2_BIANCA_BOBES_1_DWELLING_H


class Dwelling {
    double price;
    bool isProfitable;
public:
    Dwelling(double Price, int Profit) : price{Price} {if(Profit == 0) isProfitable= false; else isProfitable= true;}
    double getPrice() const {return this->price;}
    bool getProfitable() const {return this->isProfitable;}
};


#endif //T2_BIANCA_BOBES_1_DWELLING_H
