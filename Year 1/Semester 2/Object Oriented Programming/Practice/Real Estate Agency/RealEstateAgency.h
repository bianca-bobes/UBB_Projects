//
// Created by biabo on 5/11/2023.
//

#ifndef T2_BIANCA_BOBES_1_REALESTATEAGENCY_H
#define T2_BIANCA_BOBES_1_REALESTATEAGENCY_H
#include "Client.h"
#include <vector>
class RealEstateAgency {
    std::vector<Dwelling>dwellings;
    std::vector<Client*>clients;
public:
    RealEstateAgency();
    Dwelling addDwelling(double price, bool isProfitable);
    int removeClient(std::string name);
    std::vector<Dwelling> getDwellings() {return this->dwellings;}
    std::vector<Client*> getClients() {return this->clients;}
    std::vector<Client> getInterestedClients(Dwelling d);
    void writeToFile(std::string& filename);

};


#endif //T2_BIANCA_BOBES_1_REALESTATEAGENCY_H
