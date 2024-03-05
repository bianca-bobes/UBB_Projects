//
// Created by biabo on 5/11/2023.
//

#include "ui.h"
#include <iostream>

void ui::printMenu() {
    std::cout<<"Menu:\n";
    std::cout<<"1.Remove client\n";
    std::cout<<"2.Display\n";
    std::cout<<"3.Add dwelling\n";
    std::cout<<"4.Exit\n";

}

void ui::start() {
    while(true)
    {
        this->printMenu();
        std::cout<<"Your option is?\n";
        std::string option;
        std::getline(std::cin,option);

        if (option == "4") {
            std::cout << "Bye";
            return;
        }
        else if(option == "1")
            this->remove();
        else if(option == "2")
            this->display();
        else if(option == "3")
            this->add();
    }
}

void ui::remove() {
    std::string name;
    std::cout<<"Please enter the name of the client you want to remove: \n";
    std::cin>>name;
    int res = this->service.removeClient(name);
    if(res == -1)
        std::cout<<"Client does not exist\n";
    else
        std::cout<<"Remove successful\n";

}

void ui::add() {
    double price;
    std::cout<<"Price for new dwelling: \n";
    std::cin>>price;
    std::string option;
    std::cin>>option;
    bool isProfitable = false;
    if(option == "true")
        isProfitable = true;
    else if (option == "false")
        isProfitable = false;
    else
        std::cout<<"invalid bool\n";
    Dwelling d = this->service.addDwelling(price,isProfitable);
    std::cout<<"Interested Clients: \n";
    for(auto it: this->service.getInterestedClients(d))
        std::cout<<it.toString();

}

void ui::display() {
    std::cout<<"Clients: \n";
    for (auto it: this->service.getClients()) {
        std::cout<<it->toString();
    }
    std::cout<<"Dwellings: \n";
    for(auto it: this->service.getDwellings())
        std::cout<<it.getPrice()<<" "<<it.getProfitable()<<"\n";
}



