package model.exp;
import model.ADT.MyIDictionary;
import model.ADT.MyIHeap;
import model.MyException;
import model.type.IntType;
import model.type.Type;
import model.value.IntValue;
import model.value.Value;

public class ArithExp implements Exp{
    private Exp firstExpression;
    private Exp secondExpression;
    public static final int ADD = 1;
    public static final int SUBTRACT = 2;
    public static final int MULTIPLY = 3;
    public static final int DIVIDE = 4;
    private int op; // 1-plus, 2-minus, 3-star, 4-divide
    public ArithExp(String stringOp, Exp e1, Exp e2){
        this.firstExpression = e1;
        this.secondExpression = e2;
        switch(stringOp){
            case "+" -> this.op = ADD;
            case "-" -> this.op = SUBTRACT;
            case "*" -> this.op = MULTIPLY;
            case "/" -> this.op = DIVIDE;
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
    public String toString()
    {
        return "ArithExp{"+
                "e1="+ firstExpression +
                ", e2="+ secondExpression +
                ", op="+op+
                '}';
    }

    @Override
    public Value eval(MyIDictionary<String, Value> symbolTable, MyIHeap heap) throws MyException {
        Value leftValue, rightValue;
        leftValue = firstExpression.eval(symbolTable,heap);

        if (leftValue.getType().equals(new IntType())) {
            rightValue = secondExpression.eval(symbolTable,heap);

            if (rightValue.getType().equals(new IntType())) {
                IntValue intValue1 = (IntValue) leftValue;
                IntValue intValue2 = (IntValue) rightValue;
                int leftIntValue, rightIntValue;
                leftIntValue = intValue1.getVal();
                rightIntValue = intValue2.getVal();

                if (op == ArithExp.ADD) {
                    return new IntValue(leftIntValue + rightIntValue);
                }
                if (op == ArithExp.SUBTRACT) {
                    return new IntValue(leftIntValue - rightIntValue);
                }
                if (op == ArithExp.MULTIPLY) {
                    return new IntValue(leftIntValue * rightIntValue);
                }
                if (op == ArithExp.DIVIDE) {
                    if (rightIntValue == 0) {
                        throw new MyException("division by zero");
                    } else {
                        return new IntValue(leftIntValue / rightIntValue);
                    }
                }
            } else {
                throw new MyException("second operand is not an integer");
            }
        } else {
            throw new MyException("first operand is not an integer");
        }

        return null;
    }

    @Override
    public Type typecheck(MyIDictionary<String, Type> typeEnv) throws MyException {
        Type type1, type2;
        type1 = firstExpression.typecheck(typeEnv);
        type2 = secondExpression.typecheck(typeEnv);
        if (type1.equals(new IntType())) {
            if (type2.equals(new IntType())) {
                return new IntType();
            } else {
                throw new MyException("second operand is not an integer");
            }
        } else {
            throw new MyException("first operand is not an integer");
        }
    }


}

