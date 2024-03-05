package model.ADT;

import model.MyException;

import java.util.HashMap;
import java.util.Collection;
import java.util.Map;

public class MyDictionary<T, V> implements MyIDictionary<T,V>{
    private HashMap<T, V> dictionary;

    public MyDictionary() {
        dictionary = new HashMap<T, V>();
    }
    public MyDictionary(HashMap<T,V> dictionary){
        this.dictionary = dictionary;
    }

    public String toString()
    {
        StringBuilder result = new StringBuilder("MyDictionary{\n");
        for (HashMap.Entry<T, V> entry : dictionary.entrySet()) {
            result.append("\t").append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
        }
        result.append("}");
        return result.toString();
    }
    @Override
    public V lookup(T key) {
        return dictionary.get(key);
    }

    @Override
    public boolean isDefined(T key) {
        return this.dictionary.get(key) != null;
    }

    @Override
    public void update(T key, V value) throws MyException {
        if(dictionary.get(key) == null)
            throw new MyException("Key not found");
        else dictionary.put(key, value);

    }

    @Override
    public void add(T key, V value) {
    this.dictionary.putIfAbsent(key, value);
    }

    @Override
    public HashMap<T, V> getContent() {
        return this.dictionary;
    }


    @Override
    public Collection<V> values() {
        synchronized (this) {
            return dictionary.values();
        }
    }
    public MyIDictionary<T,V> deepCopy(){
        MyIDictionary<T,V> copy = new MyDictionary<T,V>();
        for(Map.Entry<T,V> entry : dictionary.entrySet())
            copy.add(entry.getKey(), entry.getValue());
        return copy;
    }
}

