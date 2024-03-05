package model.value;

import model.type.StringType;
import model.type.Type;

public class StringValue implements Value{
    private String StringValue;
    public StringValue(String value) {
        this.StringValue = value;
    }
    public String getValue() {
        return StringValue;
    }
    public String toString() {
        return StringValue;
    }
    public boolean equals(Object another) {
        if(another instanceof StringValue)
            return true;
        else
            return false;
    }
    public void setValue(String value) {
        this.StringValue = value;
    }

    @Override
    public Type getType() {
        return new StringType();
    }
}
