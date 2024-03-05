package model.value;
import model.type.Type;
import model.type.BoolType;

public class BoolValue implements Value{
    private boolean val;

    public BoolValue(boolean value) {
        this.val = value;
    }

    public boolean getValue() {
        return val;
    }

    public void setValue(boolean value) {
        this.val = value;
    }

    @Override
    public Type getType() {
        return new BoolType();
    }

    @Override
    public String toString() {
        return Boolean.toString(val);
    }

    @Override
    public boolean equals(Object another) {
        return another instanceof BoolValue;
    }

    public boolean getVal() {
        return val;
    }
}
