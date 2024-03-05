package model.ADT;

import model.MyException;

import java.util.Collection;
import java.util.HashMap;

public interface MyIDictionary<T, V> {
    V lookup(T key);
    boolean isDefined(T key);
    void update(T key, V value) throws MyException;
    void add(T key, V value);
    HashMap<T, V> getContent();

    Collection<V> values();
    MyIDictionary<T,V> deepCopy();
}
