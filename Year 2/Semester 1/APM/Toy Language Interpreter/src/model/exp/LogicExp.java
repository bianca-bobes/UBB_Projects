package model.exp;

import model.ADT.MyIDictionary;
import model.ADT.MyIHeap;
import model.MyException;
import model.type.Type;
import model.value.Value;

public class LogicExp implements Exp{
    Exp firstExpression;
    Exp secondExpression;
    public static final int AND = 1;
    public static final int OR = 2;

    int op; // 1-and, 2-or
    public LogicExp(String stringOp, Exp e1, Exp e2){
        this.firstExpression = e1;
        this.secondExpression = e2;
        switch(stringOp){
            case "&&" -> this.op = AND;
            case "||" -> this.op = OR;
        }
    }

    public Exp getFirstExpression(){
        return this.firstExpression;
    }
    public Exp getSecondExpression(){
        return this.secondExpression;
    }
    public int getOp(){
        return this.op;
    }
    public void setFirstExpression(Exp firstExpression){
        this.firstExpression = firstExpression;
    }
    public void setSecondExpression(Exp secondExpression){
        this.secondExpression = secondExpression;
    }
    public void setOp(int op){
        this.op = op;
    }

    @Override
    public Value eval(MyIDictionary<String, Value> tbl, MyIHeap heap) throws MyException {
        Value leftValue, rightValue;
        leftValue = firstExpression.eval(tbl,heap);

        if (leftValue.getType().equals(new model.type.BoolType())) {
            rightValue = secondExpression.eval(tbl,heap);

            if (rightValue.getType().equals(new model.type.BoolType())) {
                model.value.BoolValue boolValue1 = (model.value.BoolValue) leftValue;
                model.value.BoolValue boolValue2 = (model.value.BoolValue) rightValue;
                boolean leftBoolValue, rightBoolValue;
                leftBoolValue = boolValue1.getVal();
                rightBoolValue = boolValue2.getVal();

                if (op == 1) return new model.value.BoolValue(leftBoolValue && rightBoolValue);
                if (op == 2) return new model.value.BoolValue(leftBoolValue || rightBoolValue);
            } else {
                throw new MyException("second operand is not a boolean");
            }
        } else {
            throw new MyException("first operand is not a boolean");
        }
        return null;
    }

    @Override
    public Type typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type type1, type2;
        type1 = firstExpression.typecheck(typeEnv);
        type2 = secondExpression.typecheck(typeEnv);

        if (type1.equals(new model.type.BoolType())) {
            if (type2.equals(new model.type.BoolType())) {
                return new model.type.BoolType();
            } else {
                throw new MyException("second operand is not a boolean");
            }
        } else {
            throw new MyException("first operand is not a boolean");
        }
    }


}
