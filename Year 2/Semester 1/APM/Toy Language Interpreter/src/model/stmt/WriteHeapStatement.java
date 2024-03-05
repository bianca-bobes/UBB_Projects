package model.stmt;

import model.ADT.MyIDictionary;
import model.ADT.MyIHeap;
import model.MyException;
import model.PrgState;
import model.exp.Exp;
import model.type.Type;
import model.type.RefType;
import model.value.Value;
import model.value.RefValue;
import model.value.IntValue;
import model.value.Value;


public class WriteHeapStatement implements IStmt{
    private String variableName;
    private Exp expression;
    public WriteHeapStatement(String variableName, Exp expression){
        this.variableName = variableName;
        this.expression = expression;
    }
    public String getVariableName(){
        return this.variableName;
    }
    public Exp getExpression(){
        return this.expression;
    }
    public void setVariableName(String variableName){
        this.variableName = variableName;
    }
    public void setExpression(Exp expression){
        this.expression = expression;
    }

    @Override
    public String toString(){
        return "Write heap(" + this.variableName + ", " + this.expression.toString() + ")";
    }


    @Override
    public PrgState execute(PrgState state) throws MyException {
        MyIDictionary<String, Value> symTable = state.getSymTable();
        MyIHeap heap = state.getHeap();

        Value variableValue = null;
        variableValue = symTable.lookup(this.variableName);
        if(variableValue == null){
            throw new MyException("Variable " + this.variableName + " not declared!");
        }
        if(!(variableValue instanceof RefValue)){
            throw new MyException("Variable " + this.variableName + " is not a reference!");
        }
        RefValue variableRefValue = (RefValue)variableValue;
        int heapAddress = variableRefValue.getAddress();
        if(heap.get(heapAddress) == null){
            throw new MyException("Address " + heapAddress + " not allocated!");
        }
        Value expressionValue = this.expression.eval(symTable, heap);
        if (!expressionValue.getType().equals(variableRefValue.getLocationType())){
            throw new MyException("Expression type and variable type do not match!");
        }
        heap.update(heapAddress, expressionValue);
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type variableType = typeEnv.lookup(this.variableName);
        Type expressionType = this.expression.typecheck(typeEnv);
        if(variableType.equals(new RefType(expressionType))){
            return typeEnv;
        }
        else{
            throw new MyException("Write heap statement: right hand side and left hand side have different types!");
        }
    }
}
