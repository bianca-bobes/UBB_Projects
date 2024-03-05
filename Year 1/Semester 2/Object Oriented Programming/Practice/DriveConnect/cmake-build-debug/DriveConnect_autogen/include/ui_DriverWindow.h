/********************************************************************************
** Form generated from reading UI file 'driverwindow.ui'
**
** Created by: Qt User Interface Compiler version 6.5.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_DRIVERWINDOW_H
#define UI_DRIVERWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QListWidget>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_DriverWindow
{
public:
    QListWidget *listWidget1;
    QLabel *driverName1;
    QLabel *label;
    QListWidget *listWidget2;
    QLineEdit *lineEdit;
    QPushButton *pushButton;
    QPushButton *pushButton_2;

    void setupUi(QWidget *DriverWindow)
    {
        if (DriverWindow->objectName().isEmpty())
            DriverWindow->setObjectName("DriverWindow");
        DriverWindow->resize(612, 503);
        listWidget1 = new QListWidget(DriverWindow);
        listWidget1->setObjectName("listWidget1");
        listWidget1->setGeometry(QRect(30, 20, 256, 192));
        driverName1 = new QLabel(DriverWindow);
        driverName1->setObjectName("driverName1");
        driverName1->setGeometry(QRect(60, 30, 121, 16));
        label = new QLabel(DriverWindow);
        label->setObjectName("label");
        label->setGeometry(QRect(80, 220, 141, 31));
        QFont font;
        font.setPointSize(12);
        font.setBold(true);
        label->setFont(font);
        listWidget2 = new QListWidget(DriverWindow);
        listWidget2->setObjectName("listWidget2");
        listWidget2->setGeometry(QRect(220, 270, 256, 192));
        lineEdit = new QLineEdit(DriverWindow);
        lineEdit->setObjectName("lineEdit");
        lineEdit->setGeometry(QRect(20, 270, 171, 22));
        pushButton = new QPushButton(DriverWindow);
        pushButton->setObjectName("pushButton");
        pushButton->setGeometry(QRect(30, 310, 101, 24));
        pushButton_2 = new QPushButton(DriverWindow);
        pushButton_2->setObjectName("pushButton_2");
        pushButton_2->setGeometry(QRect(30, 380, 101, 24));

        retranslateUi(DriverWindow);

        QMetaObject::connectSlotsByName(DriverWindow);
    } // setupUi

    void retranslateUi(QWidget *DriverWindow)
    {
        DriverWindow->setWindowTitle(QCoreApplication::translate("DriverWindow", "DriverWindow", nullptr));
        driverName1->setText(QString());
        label->setText(QCoreApplication::translate("DriverWindow", "Chat session : ", nullptr));
        pushButton->setText(QCoreApplication::translate("DriverWindow", "Send message", nullptr));
        pushButton_2->setText(QCoreApplication::translate("DriverWindow", "Validate report", nullptr));
    } // retranslateUi

};

namespace Ui {
    class DriverWindow: public Ui_DriverWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_DRIVERWINDOW_H
