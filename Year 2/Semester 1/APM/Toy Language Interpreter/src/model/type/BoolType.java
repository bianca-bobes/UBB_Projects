package model.type;

import model.value.Value;
import model.value.BoolValue;

public class BoolType implements Type {
    @Override
    public Value defaultValue() {
        return new BoolValue(false);
    }

    @Override
    public boolean equals(Object another) {
        return another instanceof BoolType;
    }

    @Override
    public String toString() {
        return "boolean";
    }
}

