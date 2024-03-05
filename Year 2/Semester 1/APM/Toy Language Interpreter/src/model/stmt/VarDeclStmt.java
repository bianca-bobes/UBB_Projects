package model.stmt;

import model.ADT.*;
import model.MyException;
import model.PrgState;
import model.type.Type;
import model.value.Value;
public class VarDeclStmt implements IStmt{
    private String name;
    private Type type;
    public VarDeclStmt(String name, Type type){
        this.name = name;
        this.type = type;
    }
    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    public Type getType() {return type;}
    public void setType(Type type) {this.type = type;}
    @Override
    public String toString() {
        return type.toString() + " " + name;
    }

    @Override
    public PrgState execute(PrgState state) throws MyException {
       MyIStack<IStmt> exeStack = state.getExeStack();
         MyIDictionary<String, Value> symTable = state.getSymTable();
            if(symTable.isDefined(name)){
                throw new MyException("Variable already declared");
            }
            else{
                symTable.add(name, type.defaultValue());
            }
            return null;
    }

    @Override
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        typeEnv.add(name, type);
        return typeEnv;
    }
}
