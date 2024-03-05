#include "BiologistTable.h"
#include <qstandarditemmodel.h>

BiologistTable::BiologistTable(Service& serv,QWidget *parent)
	: QMainWindow(parent) ,serv{serv}
{
	ui.setupUi(this);
}

BiologistTable::~BiologistTable()
{}

void BiologistTable::populateTable()
{
	QStandardItemModel* model = new QStandardItemModel(this);
	model->setHorizontalHeaderLabels(QStringList() << "Name" << "Species" << "Size");//<< "Diseases"

	this->serv.sortVector();
	std::vector<Bacterium> bacteria = this->serv.getAllBacteria();
	for (const auto& item : bacteria)
	{
		QString name = QString::fromStdString(item.getName());
		QString specie = QString::fromStdString(item.getSpecie());
		QString size = QString::number(item.getSize());
		//QString diseases = QString::fromStdString(item.getDiseases());
		QList<QStandardItem*> rowItems;
		rowItems << new QStandardItem(name);
		rowItems << new QStandardItem(specie);
		rowItems << new QStandardItem(size);
		//rowItems << new QStandardItem(diseases);

		model->appendRow(rowItems);
	}
	

	//ui.BiologiststableView->setModel(model);
	

}
