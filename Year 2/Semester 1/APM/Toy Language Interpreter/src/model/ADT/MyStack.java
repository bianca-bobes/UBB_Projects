package model.ADT;

import model.ADT.MyIStack;

import java.util.Arrays;
import java.util.Stack;
import java.util.Collections;
import java.util.List;
public class MyStack<T> implements MyIStack<T>{
    private Stack<T> stack;
    public MyStack(){
        stack = new Stack<>();
    }
    public MyStack(Stack<T> stack)
    {
        this.stack = stack;
    }
    public Stack<T> getStack()
    {
        return stack;
    }
    public void setStack(Stack<T> stack)
    {
        this.stack = stack;
    }
    public String toString()
    {
        StringBuilder result = new StringBuilder("MyStack{\n");
        for (T item : stack) {
            result.append("\t").append(item).append("\n");
        }
        result.append("}");
        return result.toString();
    }

    @Override
    public List<T> getAll() {
        return null;
    }


    @Override
    public T pop() {
        return this.stack.pop();
    }

    @Override
    public void push(T valueToPush) {
        this.stack.push(valueToPush);
    }

    @Override
    public boolean isEmpty() {
        return this.stack.empty();
    }

    @Override
    public List<T> getReverese() {
        List<T> list = Arrays.asList((T[])this.stack.toArray());
        Collections.reverse(list);
        return list;
    }
}
