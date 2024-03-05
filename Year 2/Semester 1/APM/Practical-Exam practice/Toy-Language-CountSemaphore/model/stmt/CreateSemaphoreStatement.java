package model.stmt;

import model.MyException;
import javafx.util.Pair;
import model.exp.*;
import model.PrgState;
import model.type.IntType;
import model.type.Type;
import model.ADT.MyIDictionary;
import model.ADT.IHeap;
import model.ADT.MyISemaphoreTable;
import model.value.IntValue;
import model.value.Value;

import java.util.ArrayList;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class CreateSemaphoreStatement implements IStmt{
    private final String var;
    private final Exp expression;
    private static final Lock lock = new ReentrantLock();

    public CreateSemaphoreStatement(String var, Exp expression) {
        this.var = var;
        this.expression = expression;
    }
    @Override
    public PrgState execute(PrgState state) throws MyException{
        lock.lock();
        MyIDictionary<String, Value> symTable = state.getSymTable();
        IHeap heap = state.getHeap();
        MyISemaphoreTable semaphoreTable = state.getSemaphoreTable();
        IntValue nr = (IntValue) (expression.eval(symTable, heap));
        int number = nr.getVal();
        int freeAddress = semaphoreTable.getFreeAddress();
        semaphoreTable.put(freeAddress, new Pair<>(number, new ArrayList<>()));
        if (symTable.isDefined(var) && symTable.lookup(var).getType().equals(new IntType()))
            symTable.update(var, new IntValue(freeAddress));
        else
            throw new MyException(String.format("Error for variable %s: not defined/does not have int type!", var));
        lock.unlock();
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        if (typeEnv.lookup(var).equals(new IntType())) {
            if (expression.typeCheck(typeEnv).equals(new IntType()))
                return typeEnv;
            else
                throw new MyException("Expression is not of int type!");
        } else {
            throw new MyException(String.format("%s is not of type int!", var));
        }
    }

    @Override
    public String toString() {
        return String.format("createSemaphore(%s, %s)", var, expression);
    }
}