package model.exp;
import model.ADT.*;
import model.MyException;
import model.type.RefType;
import model.value.RefValue;
import model.value.Value;
import model.type.Type;

public class ReadHeap implements Exp{
    Exp expression;
    public ReadHeap(Exp expression){
        this.expression = expression;
    }
    public Exp getExpression(){
        return expression;
    }
    public void setExpression(Exp expression){
        this.expression = expression;
    }
    @Override
    public String toString(){
        return "read heap expression(" + expression.toString() + ")";
    }

    @Override
    public Value eval(MyIDictionary<String, Value> symTbl, MyIHeap heap) throws MyException {
       Value value = expression.eval(symTbl, heap);
       if (value instanceof RefValue){
           RefValue refValue = (RefValue) value;
           int address = refValue.getAddress();
            if (heap.isDefined(address)){
               return heap.get(address);
           }
           else{
               throw new MyException("Address not defined in heap");
           }
       }
         else{
              throw new MyException("Expression not of type RefValue");
         }
    }

    @Override
    public Type typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type type = expression.typecheck(typeEnv);
        if (type instanceof RefType){
            RefType refferenceType = (RefType) type;
            return refferenceType.getInner();
        }
        else{
            throw new MyException("Expression not of type RefType");
        }
    }
}
