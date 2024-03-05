package model.stmt;

import model.ADT.*;
import model.MyException;
import model.PrgState;
import model.type.Type;
public class NopStmt implements IStmt{
    public NopStmt(){}
    @Override
    public PrgState execute(PrgState state) throws MyException {
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        return typeEnv;
    }

}
