package model.stmt;

import model.ADT.MyHeap;
import model.PrgState;
import model.ADT.MyIHeap;
import model.ADT.MyIDictionary;
import model.MyException;
import model.exp.Exp;
import model.type.Type;
import model.value.Value;
import model.type.RefType;
import model.value.RefValue;

public class NewStatement implements IStmt{
    private String variableName;
    private Exp expression;
    public NewStatement(String variableName, Exp expression){
        this.variableName = variableName;
        this.expression = expression;
    }
    public String getVariableName(){
        return this.variableName;
    }
    public Exp getExpression(){
        return this.expression;
    }
    public String toString(){
        return "new(" + this.variableName + ", " + this.expression.toString() + ")";
    }
    public void setVariableName(String variableName){
        this.variableName = variableName;
    }
    public void setExpression(Exp expression){
        this.expression = expression;
    }
    @Override
    public PrgState execute(PrgState state) throws MyException {
        MyIDictionary<String, Value> symbolTable = state.getSymTable();
        MyIHeap heap = new MyHeap();

        Value value = symbolTable.lookup(this.variableName);
        if(value == null){
            throw new MyException("Variable " + this.variableName + " not declared!");
        }
        if(!(value.getType() instanceof RefType)){
            throw new MyException("Variable " + this.variableName + " is not a reference!");
        }
        Value expressionValue = this.expression.eval(symbolTable, heap);
        Type locationType = ((RefType) value.getType()).getInner();
        if(!expressionValue.getType().equals(locationType)){
            throw new MyException("Expression type and location type do not match!");
        }
        int heapAddress = heap.getFreeAddress();
        heap.put(heapAddress, expressionValue);
        RefValue refValue = (RefValue) value;
        RefValue newRefValue = new RefValue(heapAddress, ((RefType) refValue.getType()).getInner());
        symbolTable.update(this.variableName, newRefValue);
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
            throw new MyException("New statement: right hand side and left hand side have different types!");
        }
    }
}
