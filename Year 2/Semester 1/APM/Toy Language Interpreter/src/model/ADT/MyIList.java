package model.ADT;

import java.util.List;
public interface MyIList<V>{
    void add(V valueToAdd);
    List<V> getList();
    void clear();
}
