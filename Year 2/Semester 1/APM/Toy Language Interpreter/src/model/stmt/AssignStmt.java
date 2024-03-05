package model.stmt;

import model.ADT.*;
import model.MyException;
import model.PrgState;
import model.exp.Exp;
import model.type.Type;
import model.value.Value;
public class AssignStmt implements IStmt{
    private Exp expression;
    private String id;
    public AssignStmt(String id, Exp exp){
        this.expression = exp;
        this.id = id;
    }
    public Exp getExpression() {
        return expression;
    }
    public String getId() {
        return id;
    }
    public void setExpression(Exp expression) {
        this.expression = expression;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String toString(){
        return id + "=" + expression.toString();
    }

    @Override
    public PrgState execute(PrgState state) throws MyException {
        MyIStack<IStmt> exeStack = state.getExeStack();
        MyIDictionary<String, Value> symTable = state.getSymTable();
        MyIHeap heap = state.getHeap();

        if(symTable.isDefined(id)){
            Value val = expression.eval(symTable, heap);
            Type typId = (symTable.lookup(id)).getType();
            if(val.getType().equals(typId))
                symTable.update(id, val);
            else
                throw new MyException("declared type of variable" + id + " and type of the assigned expression do not match");
        }
        else
            throw new MyException("the used variable" + id + " was not declared before");
        return null;
    }

    @Override
    //change in order to not close the program when the types don't match

    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type typeVariable = typeEnv.lookup(id);
        Type typeExpression = expression.typecheck(typeEnv);
        if(typeVariable.equals(typeExpression))
            return typeEnv;
        else
            throw new MyException("Assignment: wrong types");
    }

}
