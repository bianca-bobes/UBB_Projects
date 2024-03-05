package model.ADT;

import java.util.HashMap;

public interface MyIFileTable<K,V> {
    V lookup(K key);
    boolean isDefined(K key);
    void update(K key, V value);
    void add(K key, V value);
    void remove(K key);
    HashMap<K,V> getContent();
}
