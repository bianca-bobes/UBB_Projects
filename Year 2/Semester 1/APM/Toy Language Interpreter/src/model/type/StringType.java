package model.type;

import model.value.Value;

public class StringType implements Type{

    @Override
    public boolean equals(Object anotherObject) {
        if(anotherObject instanceof StringType)
            return true;
        else
            return false;
    }
    public String toString() {
        return "string";
    }

    @Override
    public Value defaultValue() {
        return new model.value.StringValue("");
    }
}
