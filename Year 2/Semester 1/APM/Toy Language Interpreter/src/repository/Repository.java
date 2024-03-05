package repository;

import model.MyException;
import model.PrgState;

import java.util.List;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Repository implements IRepository{
    private List<PrgState> programList;
    private String logFilePath;
    public Repository(List<PrgState> programList, String givenLogFilePath) {
        this.programList = programList;
        logFilePath = givenLogFilePath;
    }

    @Override
    public List<PrgState> getProgramList() {
        return this.programList;
    }

    @Override
    public void setProgramList(List<PrgState> programList) {
        this.programList = programList;
    }
    @Override
    public void addPrg(PrgState prg) {
        this.programList.add(prg);
    }

    @Override
    public void logPrgStateExec(PrgState program) throws MyException {
        try {
            PrintWriter logFile = new PrintWriter(new BufferedWriter(new FileWriter(logFilePath, true)));
            logFile.println("******************************");
            logFile.println(program.toString());
            logFile.println("******************************");
            logFile.println("\n");
            logFile.close();
        } catch (IOException e) {
            throw new MyException("Error writing to log file");
        }
    }


}
