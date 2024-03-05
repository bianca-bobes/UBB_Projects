package model.value;

import model.type.Type;
import model.type.IntType;

public class IntValue implements Value{
    private int val;
    public IntValue(int val)
    {
        this.val=val;
    }
    public int getVal()
    {
        return this.val;
    }
    public void setVal(int val)
    {
        this.val=val;
    }

    @Override
    public boolean equals(Object obj) {
        return obj instanceof IntValue;
    }

    @Override
    public String toString()
    {
        return Integer.toString(this.val);
    }
    @Override
    public Type getType()
    {
        return new IntType();
    }
}
