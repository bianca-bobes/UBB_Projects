#include "ui.h"
#include "RealEstateAgency.h"
#include <iostream>

int main()
{
    RealEstateAgency service;
    ui ui{service};
    ui.start();
}