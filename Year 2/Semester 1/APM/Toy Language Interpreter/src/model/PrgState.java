package model;

import model.ADT.*;
import model.stmt.IStmt;
import model.value.Value;
import java.io.BufferedReader;
import java.io.PrintWriter;


public class PrgState {
    MyIStack<IStmt> exeStack;
    MyIDictionary<String, Value> symTable;
    MyIList<Value> out;
    MyIFileTable<String, BufferedReader> fileTable;
    IStmt originalProgram; //optional field, but good to have
    MyIHeap heap;
    private int id;
    private static int idCounter = 0;
    public PrgState(MyIStack<IStmt> stk, MyIDictionary<String, Value> symtbl, MyIList<Value> ot,MyIFileTable<String,BufferedReader> fileTable ,IStmt prg,MyIHeap heap){
        exeStack=stk;
        symTable=symtbl;
        out = ot;
        this.heap = heap;
        originalProgram=prg;
        this.fileTable = fileTable;
        id = setFreeAddress();
        stk.push(prg);
    }

    @Override
    public String toString() {
        return "Id: " + id + "\n" +
                "PrgState{" + "\n" +
                "exeStack=" + exeStack + "\n" +
                ", symTable=" + symTable + "\n" +
                ", out=" + out + "\n" +
                ", fileTable=" + fileTable + "\n" +
                ", heap=" + heap + "\n" +
                '}' + "\n";
    }

    public int getId() {
        return id;
    }
    public int setFreeAddress(){
        idCounter++;
        return idCounter;
    }
    public MyIHeap getHeap() {
        return heap;
    }
    public MyIStack<IStmt> getExeStack() {
        return exeStack;
    }
    public MyIDictionary<String, Value> getSymTable() {
        return symTable;
    }
    public MyIList<Value> getOut() {
        return out;
    }
    public MyIFileTable<String, BufferedReader> getFileTable() {
        return fileTable;
    }

    public void setHeap(MyIHeap heap) {
        this.heap = heap;
    }
    public void setFileTable(MyIFileTable<String, BufferedReader> fileTable) {
        this.fileTable = fileTable;
    }
    public void setExeStack(MyIStack<IStmt> exeStack) {
        this.exeStack = exeStack;
    }

    public void setSymTable(MyIDictionary<String, Value> symTable) {
        this.symTable = symTable;
    }
    public void setOut(MyIList<Value> out) {
        this.out = out;
    }
    public Boolean isNotCompleted(){
        return !exeStack.isEmpty();
    }
    public PrgState oneStep() throws Exception {
        if(exeStack.isEmpty()) throw new Exception("Program state stack is empty");
        IStmt statementToBeExecuted = exeStack.pop();
        return statementToBeExecuted.execute(this);
    }
    public IStmt getOriginalProgram() {
        return originalProgram;
    }
}
