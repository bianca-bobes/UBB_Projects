package model.type;

import model.value.Value;
import model.value.IntValue;
public class IntType implements Type {

    public boolean equals(Object another) {
        return another instanceof IntType;
    }

    @Override
    public String toString() {
        return "int";
    }

    @Override
    public Value defaultValue() {
        return new IntValue(0);
    }
}
