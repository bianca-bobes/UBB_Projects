package model.ADT;

import model.value.Value;

import java.util.HashMap;

public interface MyIHeap {
    void put(int key, Value value);
    Value get(int key);
    boolean containsKey(int key);
    void update(int key, Value value);

    int getFreeAddress();

    void setContent(HashMap<Integer, Value> heap);

    HashMap<Integer, Value> getContent();

    boolean isDefined(int address);
}