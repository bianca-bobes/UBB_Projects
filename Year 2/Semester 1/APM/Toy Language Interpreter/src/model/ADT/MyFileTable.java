package model.ADT;

import java.util.HashMap;

public class MyFileTable<K,V>  implements MyIFileTable<K,V>{
    private HashMap<K,V> fileTable;

    public MyFileTable() {
        fileTable = new HashMap<K,V>();
    }
    public MyFileTable(HashMap<K,V> fileTable) {
        this.fileTable = fileTable;
    }
    public void setFileTable(HashMap<K,V> fileTable) {
        this.fileTable = fileTable;
    }

    @Override
    public V lookup(K key) {
        return fileTable.get(key);
    }

    @Override
    public boolean isDefined(K key) {
        return fileTable.containsKey(key);
    }

    @Override
    public void update(K key, V value) {
        if(fileTable.containsKey(key))
            fileTable.put(key, value);
    }

    @Override
    public void add(K key, V value) {
        fileTable.putIfAbsent(key, value);
    }

    @Override
    public void remove(K key) {
        fileTable.remove(key);
    }

    @Override
    public HashMap<K, V> getContent() {
        return fileTable;
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder("MyFileTable{\n");
        for (HashMap.Entry<K, V> entry : fileTable.entrySet()) {
            result.append("\t").append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
        }
        result.append("}");
        return result.toString();
    }
}
