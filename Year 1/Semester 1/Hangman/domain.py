from random import randint

class Sentence:

    def readfromfile(self, fname):

        with open(fname, 'r') as f:
            lines = f.readlines()
            a = randint(0, len(lines)-1)
            self.sentence = lines[a]
            self.sentence = self.sentence.strip("\n")
        f.close()

    def writetofile(self, fname):

        with open(fname, 'r') as f:
            lines = f.readlines()

        with open(fname, 'w') as f:
            ok = True
            for line in lines:
                if line.strip("\n") == self.sentence:
                    ok = False
                f.write(line)
            if ok == False:
                f.close()
                return False
            f.write(self.sentence)
            f.write("\n")
        f.close()
        return True


    def setsentence(self, string):
        self.sentence = string

string = "asd"
print(string[len(string)-1])