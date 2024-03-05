package model.stmt;

import model.MyException;
import model.PrgState;
import model.type.IntType;
import model.type.Type;
import model.ADT.MyIDictionary;
import model.ADT.IHeap;
import model.ADT.MyIToySemaphoreTable;
import model.ADT.Tuple;
import model.value.IntValue;
import model.value.Value;

import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReleaseStatement implements IStmt{
    private final String var;
    private static final Lock lock = new ReentrantLock();

    public ReleaseStatement(String var) {
        this.var = var;
    }

    @Override
    public PrgState execute(PrgState state) throws MyException {
        lock.lock();
        MyIDictionary<String, Value> symTable = state.getSymTable();
        MyIToySemaphoreTable semaphoreTable = state.getToySemaphoreTable();
        if (symTable.isDefined(var)) {
            if (symTable.lookup(var).getType().equals(new IntType())) {
                IntValue fi = (IntValue) symTable.lookup(var);
                int foundIndex = fi.getVal();
                if (semaphoreTable.containsKey(foundIndex)) {
                    Tuple<Integer, List<Integer>, Integer> foundSemaphore = semaphoreTable.get(foundIndex);
                    if (foundSemaphore.getSecond().contains(state.getId())) {
                        foundSemaphore.getSecond().remove((Integer) state.getId());
                    }
                    semaphoreTable.update(foundIndex, new Tuple<>(foundSemaphore.getFirst(), foundSemaphore.getSecond(), foundSemaphore.getThird()));
                } else {
                    throw new MyException("Index not found in the semaphore table!");
                }
            } else {
                throw new MyException("Index must be of int type!");
            }
        } else {
            throw new MyException("Index not found in the symbol table!");
        }
        lock.unlock();
        return null;
    }

    @Override
    public MyIDictionary<String, Type> typeCheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        return typeEnv;
    }


    @Override
    public String toString() {
        return String.format("release(%s)", var);
    }
}