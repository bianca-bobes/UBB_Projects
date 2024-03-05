package model.stmt;

import model.ADT.*;

import model.PrgState;
import model.type.StringType;
import model.value.StringValue;
import model.value.Value;
import model.MyException;
import model.type.Type;
import model.exp.Exp;
import model.ADT.MyIStack;
import java.beans.Expression;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
public class OpenReadFileStatement implements IStmt{
    private Exp exppression;
    public OpenReadFileStatement(Exp givenExppression){
        this.exppression = givenExppression;
    }
    public String toString(){
        return "openRFile(" +
                "exp=" + exppression.toString() +
                ")";
    }
    public void  setExppression(Exp givenExppression){
        this.exppression = givenExppression;
    }
    public Exp getExppression(){
        return this.exppression;
    }

    @Override
    public PrgState execute(PrgState state) throws MyException {
        MyIStack<IStmt> stack = state.getExeStack();
        MyIDictionary<String, Value> symbolTable = state.getSymTable();
        MyIFileTable<String, BufferedReader> fileTable = state.getFileTable();
        MyIHeap heap = state.getHeap();

        Value value = this.exppression.eval(symbolTable, heap);
        if(value.getType().equals(new StringType())){
            StringValue stringValue = (StringValue)value;
            String file = stringValue.getValue();
            if(fileTable.isDefined(file)){
                throw new MyException("File already opened!");
            }
            else{
                try{
                    BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
                    fileTable.add(file, bufferedReader);
                }
                catch(IOException e){
                    throw new MyException("File not found!");
                }
            }
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type typeExpression = this.exppression.typecheck(typeEnv);
        if(typeExpression.equals(new StringType())){
            return typeEnv;
        }
        else{
            throw new MyException("Expression is not a string!");
        }
    }
}
