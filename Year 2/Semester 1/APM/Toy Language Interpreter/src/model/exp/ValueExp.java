package model.exp;

import model.ADT.MyIDictionary;
import model.ADT.MyIHeap;
import model.MyException;
import model.type.Type;
import model.value.Value;

public class ValueExp implements Exp{
    private Value e;
    public ValueExp(Value e){
        this.e = e;
    }
    public Value getE(){
        return this.e;
    }
    public void setE(Value e){
        this.e = e;
    }
    @Override
    public String toString()
    {
        return "ValueExp{"+
                "e="+e+
                '}';
    }

    @Override
    public Value eval(MyIDictionary<String, Value> tbl, MyIHeap heap) throws MyException {
        return e;
    }

    @Override
    public Type typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        return e.getType();
    }

}
