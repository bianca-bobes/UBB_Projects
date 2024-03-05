import model.*;
import model.PrgState;
import model.MyException;
import model.ADT.MyIStack;
import model.ADT.MyStack;
import model.exp.*;
import model.stmt.AssignStmt;
import model.stmt.CompStmt;
import model.stmt.IStmt;
import model.stmt.VarDeclStmt;
import model.type.StringType;
import model.value.StringValue;
import model.ADT.MyIStack;
import model.ADT.MyStack;
import model.ADT.MyIHeap;
import model.ADT.MyHeap;
import model.exp.ValueExp;
import model.ADT.MyIFileTable;
import model.ADT.MyFileTable;
import model.exp.VarExp;
import model.ADT.*;
import model.stmt.*;
import model.type.*;
import model.value.*;
import repository.*;
import controller.*;
import view.*;
import java.util.List;

import java.io.BufferedReader;

public class Interpreter {
    public static void main(String[] args) throws MyException {
        TextMenu menu = new TextMenu();
        menu.addCommand(new ExitCommand("0", "exit"));

        //int v; v=2;Print(v)
        IStmt ex4 = new CompStmt(new VarDeclStmt("v",new IntType()),
                new CompStmt(new AssignStmt("v",new ValueExp(new IntValue(2))), new PrintStmt(new VarExp("v"))));
        MyIStack<IStmt> stk4 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl4 = new MyDictionary<String,Value>();
        MyIList<Value> out4 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable4 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap4 = new MyHeap();

        ex4.typecheck(new MyDictionary<String, Type>());
        PrgState prg4 = new PrgState(stk4,symtbl4,out4,fileTable4,ex4,heap4);
        List<PrgState> l4 = List.of(prg4);
        IRepository repo4 = new Repository(l4,"log1.txt");
        Controller ctr4 = new Controller(repo4);
        menu.addCommand(new RunExample("1", ex4.toString(), ctr4));

        //int a;int b; a=2+3*5;b=a+1;Print(b)
        IStmt ex2 = new CompStmt( new VarDeclStmt("a",new IntType()),
                new CompStmt(new VarDeclStmt("b",new IntType()),
                        new CompStmt(new AssignStmt("a", new ArithExp("+",new ValueExp(new IntValue(2)),new
                                ArithExp("*",new ValueExp(new IntValue(3)), new ValueExp(new IntValue(5))))),
                                new CompStmt(new AssignStmt("b",new ArithExp("+",new VarExp("a"), new ValueExp(new
                                        IntValue(1)))), new PrintStmt(new VarExp("b"))))));
        MyIStack<IStmt> stk2 = new MyStack<>();
        MyIDictionary<String, Value> symtbl2 = new MyDictionary<>();
        MyIList<Value> out2 = new MyList<>();
        MyIFileTable<String, BufferedReader> fileTable2 = new MyFileTable<>();
        MyIHeap heap2 = new MyHeap();

        ex2.typecheck(new MyDictionary<String, Type>());
        PrgState prg2 = new PrgState(stk2, symtbl2, out2,fileTable2, ex2,heap2);
        List<PrgState> myPrgList2 = List.of(prg2);
        IRepository repo2 = new Repository(myPrgList2, "log2.txt");
        Controller ctr2 = new Controller(repo2);
        menu.addCommand(new RunExample("2", ex2.toString(), ctr2));


        //bool a; int v; a=true;(If a Then v=2 Else v=3);Print(v)
        IStmt ex3 = new CompStmt(new VarDeclStmt("a",new BoolType()),
                new CompStmt(new VarDeclStmt("v", new IntType()),
                        new CompStmt(new AssignStmt("a", new ValueExp(new BoolValue(true))),
                                new CompStmt(new IfStmt(new VarExp("a"),new AssignStmt("v",new ValueExp(new
                                        IntValue(2))), new AssignStmt("v", new ValueExp(new IntValue(3)))), new PrintStmt(new
                                        VarExp("v"))))));
        MyIStack<IStmt> stk3 = new MyStack<>();
        MyIDictionary<String, Value> symtbl3 = new MyDictionary<>();
        MyIList<Value> out3 = new MyList<>();
        MyIFileTable<String, BufferedReader> fileTable3 = new MyFileTable<>();
        MyIHeap heap3 = new MyHeap();

       ex3.typecheck(new MyDictionary<String, Type>());

        PrgState prgState3 = new PrgState(stk3, symtbl3, out3,fileTable3, ex3,heap3);
        List<PrgState> myPrgList3 = List.of(prgState3);
        IRepository repo3 = new Repository(myPrgList3, "log3.txt");
        Controller ctr3 = new Controller(repo3);
        menu.addCommand(new RunExample("3", ex3.toString(), ctr3));

        //THE READ FROM FILE EXAMPLE:
        IStmt example1 = new CompStmt(new VarDeclStmt("varf", new StringType()), new CompStmt(new AssignStmt("varf", new ValueExp(new StringValue("test.in"))), new CompStmt(new OpenReadFileStatement(new VarExp("varf")), new CompStmt(new VarDeclStmt("varc", new IntType()), new CompStmt(new ReadFileStatement(new VarExp("varf"), "varc"), new CompStmt(new PrintStmt(new VarExp("varc")), new CompStmt(new ReadFileStatement(new VarExp("varf"), "varc"), new CompStmt(new PrintStmt(new VarExp("varc")), new CloseReadFileStatement(new VarExp("varf"))))))))));
        MyIStack<IStmt> stk1 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl1 = new MyDictionary<String,Value>();
        MyIList<Value> out1 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable1 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap1 = new MyHeap();

        example1.typecheck(new MyDictionary<String, Type>());
        PrgState prg1 = new PrgState(stk1,symtbl1,out1,fileTable1,example1,heap1);
        List<PrgState> l1 = List.of(prg1);
        IRepository repo1 = new Repository(l1,"log4.txt");
        Controller ctr1 = new Controller(repo1);
        menu.addCommand(new RunExample("4", example1.toString(), ctr1));

        //int v; v=4; (while (v>0) print(v);v=v-1);print(v)
        IStmt ex5 = new CompStmt(new VarDeclStmt("v",new IntType()),
                new CompStmt(new AssignStmt("v",new ValueExp(new IntValue(4))),
                        new CompStmt(new WhileStatement(new RelationalExpressions(">",new VarExp("v"),new ValueExp(new IntValue(0))),
                                new CompStmt(new PrintStmt(new VarExp("v")), new AssignStmt("v",new ArithExp("-",
                                        new VarExp("v"),new ValueExp(new IntValue(1)))))),
                                new PrintStmt(new VarExp("v")))));
        MyIStack<IStmt> stk5 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl5 = new MyDictionary<String,Value>();
        MyIList<Value> out5 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable5 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap5 = new MyHeap();

        ex5.typecheck(new MyDictionary<String, Type>());
        PrgState prg5 = new PrgState(stk5,symtbl5,out5,fileTable5,ex5,heap5);
        List<PrgState> l5 = List.of(prg5);
        IRepository repo5 = new Repository(l5,"log5.txt");
        Controller ctr5 = new Controller(repo5);
        menu.addCommand(new RunExample("5", ex5.toString(), ctr5));

        //Ref int v;new(v,20);Ref Ref int a; new(a,v);print(v);print(a)
        //At the end of execution: Heap={1->20, 2->(1,int)}, SymTable={v->(1,int), a->(2,Ref int)} and
        //Out={(1,int),(2,Ref int)}
        IStmt ex6 = new CompStmt(new VarDeclStmt("v",new RefType(new IntType())),
                new CompStmt(new NewStatement("v",new ValueExp(new IntValue(20))),
                        new CompStmt(new VarDeclStmt("a",new RefType(new RefType(new IntType()))),
                                new CompStmt(new NewStatement("a",new VarExp("v")),
                                        new CompStmt(new PrintStmt(new VarExp("v")), new PrintStmt(new VarExp("a")))))));
        MyIStack<IStmt> stk6 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl6 = new MyDictionary<String,Value>();
        MyIList<Value> out6 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable6 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap6 = new MyHeap();

        ex6.typecheck(new MyDictionary<String, Type>());
        PrgState prg6 = new PrgState(stk6,symtbl6,out6,fileTable6,ex6,heap6);
        List<PrgState> l6 = List.of(prg6);
        IRepository repo6 = new Repository(l6,"log6.txt");
        Controller ctr6 = new Controller(repo6);
        menu.addCommand(new RunExample("6", ex6.toString(), ctr6));

        //Ref int v;new(v,20);Ref Ref int a; new(a,v);print(rH(v));print(rH(rH(a))+5)
        //At the end of execution: Heap={1->20, 2->(1,int)}, SymTable={v->(1,int), a->(2,Ref int)} and
        //Out={20, 25}
        IStmt ex7 = new CompStmt(new VarDeclStmt("v",new RefType(new IntType())),
                new CompStmt(new NewStatement("v",new ValueExp(new IntValue(20))),
                        new CompStmt(new VarDeclStmt("a",new RefType(new RefType(new IntType()))),
                                new CompStmt(new NewStatement("a",new VarExp("v")),
                                        new CompStmt(new PrintStmt(new ReadHeap(new VarExp("v"))),
                                                new PrintStmt(new ArithExp("+",new ReadHeap(new ReadHeap(new VarExp("a"))),new ValueExp(new IntValue(5)))))))));
        MyIStack<IStmt> stk7 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl7 = new MyDictionary<String,Value>();
        MyIList<Value> out7 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable7 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap7 = new MyHeap();

        ex7.typecheck(new MyDictionary<String, Type>());
        PrgState prg7 = new PrgState(stk7,symtbl7,out7,fileTable7,ex7,heap7);
        List<PrgState> l7 = List.of(prg7);
        IRepository repo7 = new Repository(l7,"log7.txt");
        Controller ctr7 = new Controller(repo7);
        menu.addCommand(new RunExample("7", ex7.toString(), ctr7));

        //Ref int v;new(v,20);Ref Ref int a; new(a,v); new(v,30);print(rH(rH(a)))
        //At the end of execution: Heap={1->30, 2->(1,int)}, SymTable={v->(1,int), a->(2,Ref int)} and
        //Out={20}
        IStmt ex8 = new CompStmt(new VarDeclStmt("v",new RefType(new IntType())),
                new CompStmt(new NewStatement("v",new ValueExp(new IntValue(20))),
                        new CompStmt(new VarDeclStmt("a",new RefType(new RefType(new IntType()))),
                                new CompStmt(new NewStatement("a",new VarExp("v")),
                                        new CompStmt(new NewStatement("v",new ValueExp(new IntValue(30))),
                                                new PrintStmt(new ReadHeap(new ReadHeap(new VarExp("a")))))))));
        MyIStack<IStmt> stk8 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl8 = new MyDictionary<String,Value>();
        MyIList<Value> out8 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable8 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap8 = new MyHeap();

        ex8.typecheck(new MyDictionary<String, Type>());
        PrgState prg8 = new PrgState(stk8,symtbl8,out8,fileTable8,ex8,heap8);
        List<PrgState> l8 = List.of(prg8);
        IRepository repo8 = new Repository(l8,"log8.txt");
        Controller ctr8 = new Controller(repo8);
        menu.addCommand(new RunExample("8", ex8.toString(), ctr8));

        //int v; Ref int a; v=10;new(a,22);
        // fork(wH(a,30);v=32;print(v);print(rH(a)));
        // print(v);print(rH(a))
        //At the end:
        //Id=1
        //SymTable_1={v->10,a->(1,int)}
        //Id=10
        //SymTable_10={v->32,a->(1,int)}
        //Heap={1->30}
        //Out={10,30,32,30}
        IStmt ex9 = new CompStmt(new VarDeclStmt("v",new IntType()),
                new CompStmt(new VarDeclStmt("a",new RefType(new IntType())),
                        new CompStmt(new AssignStmt("v",new ValueExp(new IntValue(10))),
                                new CompStmt(new NewStatement("a",new ValueExp(new IntValue(22))),
                                        new CompStmt(new ForkStatement(new CompStmt(new WriteHeapStatement("a",new ValueExp(new IntValue(30))),
                                                new CompStmt(new AssignStmt("v",new ValueExp(new IntValue(32))),
                                                        new CompStmt(new PrintStmt(new VarExp("v")),new PrintStmt(new ReadHeap(new VarExp("a"))))))),
                                                new CompStmt(new PrintStmt(new VarExp("v")),new PrintStmt(new ReadHeap(new VarExp("a")))))))));

        MyIStack<IStmt> stk9 = new MyStack<IStmt>();
        MyIDictionary<String, Value> symtbl9 = new MyDictionary<String,Value>();
        MyIList<Value> out9 = new MyList<Value>();
        MyIFileTable<String, BufferedReader> fileTable9 = new MyFileTable<String, BufferedReader>();
        MyIHeap heap9 = new MyHeap();

        ex9.typecheck(new MyDictionary<String, Type>());
        PrgState prg9 = new PrgState(stk9,symtbl9,out9,fileTable9,ex9,heap9);
        List<PrgState> l9 = List.of(prg9);
        IRepository repo9 = new Repository(l9,"log9.txt");
        Controller ctr9 = new Controller(repo9);
        menu.addCommand(new RunExample("9", ex9.toString(), ctr9));

        menu.show();

    }
}
