#include "BiologistWindow.h"
#include <qstandarditemmodel.h>

BiologistWindow::BiologistWindow(Service& serv, std::string userName, QWidget *parent)
	: QMainWindow(parent),serv{serv},userName{userName}
{
	ui.setupUi(this);
	this->setWindowTitle(QString::fromStdString(userName));
}

BiologistWindow::~BiologistWindow()
{}


