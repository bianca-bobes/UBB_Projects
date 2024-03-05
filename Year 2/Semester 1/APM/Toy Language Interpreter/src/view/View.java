package view;

import controller.Controller;
import model.ADT.*;
import model.MyException;
import model.PrgState;
import model.exp.ValueExp;
import model.exp.VarExp;
import model.stmt.*;
import model.type.IntType;
import model.value.IntValue;
import model.value.Value;
import repository.IRepository;
import repository.Repository;

import java.util.List;

public class View {
    private Controller controller;
    //View: At this phase of the project, design and implement a text interface for the following
    //functionalities: input a program and complete execution of a program.
    //For the menu option "input a program" you may allow the user to select a program from
    //your programs already hardcoded in your main method.

    public View(Controller controller) {
        this.controller = controller;
    }
    public void setController(Controller controller) {
        this.controller = controller;
    }
    public Controller getController() {
        return controller;
    }
    public void run() throws MyException {
        try {
            controller.allStep();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}
