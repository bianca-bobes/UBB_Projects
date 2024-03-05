/********************************************************************************
** Form generated from reading UI file 'mappingwindow.ui'
**
** Created by: Qt User Interface Compiler version 6.5.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAPPINGWINDOW_H
#define UI_MAPPINGWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_mappingwindow
{
public:

    void setupUi(QWidget *mappingwindow)
    {
        if (mappingwindow->objectName().isEmpty())
            mappingwindow->setObjectName("mappingwindow");
        mappingwindow->resize(400, 300);

        retranslateUi(mappingwindow);

        QMetaObject::connectSlotsByName(mappingwindow);
    } // setupUi

    void retranslateUi(QWidget *mappingwindow)
    {
        mappingwindow->setWindowTitle(QCoreApplication::translate("mappingwindow", "mappingwindow", nullptr));
    } // retranslateUi

};

namespace Ui {
    class mappingwindow: public Ui_mappingwindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAPPINGWINDOW_H
