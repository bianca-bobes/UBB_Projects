package model.stmt;

import model.MyException;
import model.ADT.MyIDictionary;
import model.PrgState;
import model.type.Type;


public interface IStmt {
    public PrgState execute(PrgState state) throws MyException;
    public MyIDictionary<String, Type> typecheck(MyIDictionary<String,Type> typeEnv) throws MyException;
}
