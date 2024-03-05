from domain import Sentence

class UI:

    @staticmethod
    def PrintMenu():
        string = "Choose your option: \n"
        string += "1. Add a sentence \n"
        string += "2. Play hangman \n"
        string += "0. Exit"
        print(string)

    @staticmethod
    def ValidCommands(command):
        availablecommands = ['1', '2', '0']
        return command in availablecommands

    def add_sentence(self):
        s = Sentence()

        ok = False
        while ok == False:
            string = input("Please introduce a sentece with a minimum number of 3 words (3 letters each): ")
            string = string.strip()
            contor = 0
            for i in string:
                if i == " ":
                    contor += 1
            if contor < 2:
                print("Not enough words!")
            else:
                ok2 = True
                contor = 0
                for i in string:
                    if i != " ":
                        contor += 1
                    else:
                        if contor < 3:
                            print("One of the words does not have enough letters!")
                            ok2 = False
                            break
                        else:
                            contor = 0
                if contor < 3:
                    print("One of the words does not have enough letters!")
                    ok2 = False
                if ok2 == True:
                    s.setsentence(string)
                    if s.writetofile("Hangman.txt") == True:
                        ok = True
                    else:
                        print("This sentence already exists")

        print("\n")
        print("\n")

    def playhangman(self):
        s = Sentence()
        s.readfromfile("Hangman.txt")

        impletters = []
        impletters.append(s.sentence[0])
        for i in range(len(s.sentence)):
            if s.sentence[i] == " ":
                impletters.append(s.sentence[i - 1])
                impletters.append(s.sentence[i + 1])
        impletters.append(s.sentence[-1])
        impletters.append(" ")

        string = ""
        contor = 0
        for i in range(len(s.sentence)):
            if s.sentence[i] not in impletters:
                string = string + "_"
                contor += 1
            else:
                string = string + s.sentence[i]
        hg1 = "hangman"
        k = 0
        hg2 = ""
        pastchs = []
        while contor > 0 and hg2 != hg1:
            print(string + " - " + hg2)
            ch = input("Please choose a letter: ")
            if ch in pastchs or ch not in s.sentence:
                k += 1
                hg2 = hg1[0:k]
            else:
                newstring = ""
                for i in range(len(s.sentence)):
                    if s.sentence[i] == ch:
                        newstring = newstring + ch
                        contor -= 1
                    else:
                        newstring = newstring + string[i]
                string = newstring

        if hg2 == hg1:
            print(string + " - " + hg2)
            print("You lost!")

        if contor == 0:
            print(string + " - " + hg2)
            print("You won!")

        print("\n")
        print("\n")

    def MainMenu(self):
        commandDict = {'1': self.add_sentence,
                       '2': self.playhangman}
        while True:
            UI.PrintMenu()
            command = input("Please choose your option: ")
            while not UI.ValidCommands(command):
                command = input("Please type a valid command! ")
            if command == '0':
                break
            commandDict[command]()

ui = UI()
ui.MainMenu()

