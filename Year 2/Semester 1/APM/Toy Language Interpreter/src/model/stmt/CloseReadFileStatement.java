package model.stmt;

import model.ADT.MyIHeap;
import model.PrgState;
import model.ADT.MyIDictionary;
import model.ADT.MyIStack;
import model.ADT.MyIFileTable;
import model.exp.Exp;
import model.value.Value;
import model.value.StringValue;
import model.MyException;
import model.type.Type;
import model.type.StringType;

import java.io.BufferedReader;
import java.io.IOException;

public class CloseReadFileStatement implements IStmt{
    private Exp expression;
    public CloseReadFileStatement(Exp expression) {
        this.expression = expression;
    }
    public Exp getExpression() {
        return expression;
    }
    public void setExpression(Exp expression) {
        this.expression = expression;
    }
    public String toString() {
        return "closeRFile(" +
                "expression=" + expression +
                ')';
    }

    @Override
    public PrgState execute(PrgState state) throws MyException {
        MyIDictionary<String,Value> symbolTable = state.getSymTable();
        MyIFileTable<String, BufferedReader> fileTable = state.getFileTable();
        MyIStack<IStmt> stack = state.getExeStack();
        MyIHeap heap = state.getHeap();

        Value value = expression.eval(symbolTable,heap);
        if(value.getType().equals(new StringType())){
            StringValue stringValue = (StringValue)value;
            String filename = stringValue.getValue();
            BufferedReader bufferedReader = fileTable.lookup(filename);
            try{
                bufferedReader.close();
            }catch (IOException e){
                throw new MyException("File "+filename+" cannot be closed");

            }
            fileTable.remove(filename);
        }
        else{
            throw new MyException("Invalid type");
        }
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type typeExpression = expression.typecheck(typeEnv);
        if(typeExpression.equals(new StringType()))
            return typeEnv;
        else
            throw new MyException("CloseReadFileStatement: expression is not a string");
    }
}
