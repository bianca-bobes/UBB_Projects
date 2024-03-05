package controller;
import model.ADT.MyIList;
import model.value.RefValue;
import model.value.Value;
import repository.IRepository;
import model.MyException;
import model.PrgState;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Callable;
import java.util.stream.Stream;
public class Controller {
    private IRepository repository;
    private ExecutorService executor;
    private List<String> outputList;
    public Controller(IRepository repository) {
        this.repository = repository;
    }
    public IRepository getRepository() {
        return repository;
    }
    public void setRepository(IRepository repository) {
        this.repository = repository;
    }
    public List<PrgState> getProgramStates(){
        return repository.getProgramList();
    }

    //add a method that gets the output list not the exe stack
    public MyIList<Value> getOut(PrgState state){
        return state.getOut();
    }
    private List<Integer> getAddrFromSymTable(Collection<Value> symTableValues) {
        return symTableValues.stream()
                .filter(v -> v instanceof RefValue)
                .map(v -> {RefValue v1 = (RefValue)v; return v1.getAddress();})
                .collect(Collectors.toList());
    }


    private List<Integer> getAddrFromHeap(Collection<Value> heapValues) {
        return heapValues.stream()
                .filter(v -> v instanceof RefValue)
                .map(v -> {RefValue v1 = (RefValue)v; return v1.getAddress();})
                .collect(Collectors.toList());
    }

    private Map<Integer, Value> unsafeGarbageCollector(List<Integer> symTableAddr, Map<Integer, Value> heap) {
        return heap.entrySet().stream()
                .filter(e -> symTableAddr.contains(e.getKey()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
    public void conservativeGarbageCollector(List<PrgState> programStates) {
        List<Integer> symTableAddresses = Objects.requireNonNull(programStates.stream()
                        .map(p -> getAddrFromSymTable(p.getSymTable().values()))
                        .map(Collection::stream)
                        .reduce(Stream::concat).orElse(null))
                .collect(Collectors.toList());
        programStates.forEach(p -> p.getHeap().setContent((HashMap<Integer, Value>) safeGarbageCollector(symTableAddresses, p.getHeap().getContent())));
    }

    private Map<Integer, Value> safeGarbageCollector(List<Integer> symTableAddr, Map<Integer, Value> heap) {
        List<Integer> heapAddr = getAddrFromHeap(heap.values());
        return heap.entrySet().stream()
                .filter(e -> (symTableAddr.contains(e.getKey()) || heapAddr.contains(e.getKey())))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
    public List<PrgState> removeCompletedPrg(List<PrgState> inputProgramList) {
        return inputProgramList.stream()
                .filter(p -> p.isNotCompleted())
                .collect(Collectors.toList());
    }
    public void oneStepForAllPrograms(List<PrgState> programList) throws InterruptedException{
        programList.forEach(prg -> {
            try {
                repository.logPrgStateExec(prg);
            } catch (MyException e) {
                throw new RuntimeException(e.getMessage());
            }
        });

        List<Callable<PrgState>> callableList = programList.stream()
                .map((PrgState p) -> (Callable<PrgState>)(() -> {return p.oneStep();}))
                .collect(Collectors.toList());

        List<PrgState> newProgramList = executor.invokeAll(callableList).stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (InterruptedException | ExecutionException e) {
                        throw new RuntimeException(e.getMessage());
                    }
                })
                .filter(p -> p != null)
                .collect(Collectors.toList());
        programList.addAll(newProgramList);
        programList.forEach(prg -> {
            try {
                repository.logPrgStateExec(prg);
            } catch (MyException e) {
                throw new RuntimeException(e.getMessage());
            }
        });
        repository.setProgramList(programList);
    }

    public void allStep() throws InterruptedException {
        executor = Executors.newFixedThreadPool(2);
        List<PrgState> programList = removeCompletedPrg(repository.getProgramList());
        while(programList.size() > 0){
            conservativeGarbageCollector(programList);
            oneStepForAllPrograms(programList);
            System.out.println(programList.get(0).getOut());
            programList = removeCompletedPrg(repository.getProgramList());
        }
        executor.shutdownNow();
        repository.setProgramList(programList);
    }
    public void oneStepForAllPrg(List<PrgState> prgList) throws InterruptedException {
        // before the execution, print the prg state list into the log file
        prgList.forEach(prg -> {
            try {
                repository.logPrgStateExec(prg);
            } catch (MyException e) {
                throw new RuntimeException(e);
            }
        });
        // run concurrently one step for each of the existing prg states
        //prepare the list of callables
        List<Callable<PrgState>> callList = prgList.stream()
                .map((PrgState p) -> (Callable<PrgState>) (() -> {return p.oneStep();}))
                .collect(Collectors.toList());

        // start the execution of the callables
        // it returns the list of new created prg states (namely threads)
        List<PrgState> newPrgList = executor.invokeAll(callList).stream()
                .map(future -> {
                    try {
                        return future.get();
                    } catch (InterruptedException | ExecutionException exception) {
                        throw new RuntimeException(exception);
                    }
                })
                .filter(p -> p != null)
                .collect(Collectors.toList());

        // add the new created threads to the list of existing threads
        prgList.addAll(newPrgList);

        // after the execution, print the prg state list into the log file
        prgList.forEach(prg -> {
            try {
                repository.logPrgStateExec(prg);
            } catch (MyException e) {
                throw new RuntimeException(e);
            }
        });

        // save the current programs in the repository
        repository.setProgramList(prgList);
    }

    public void oneStep() throws InterruptedException {
        executor = Executors.newFixedThreadPool(2);
        List<PrgState> programStates = removeCompletedPrg(repository.getProgramList());
        oneStepForAllPrg(programStates);
        conservativeGarbageCollector(programStates);
        executor.shutdownNow();
    }
    public void setProgramStates(List<PrgState> prgStates) {
        repository.setProgramList(prgStates);
    }


}
