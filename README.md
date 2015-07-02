# expenses-log
A web-app written in angular. Its purpose is to let the user store its expenses for each day without the intervention of any server or database.
Features:
1. user can introduce multiple expenses associated with a date through a form -- DONE
2. user can store its expenes on browser's localstorage with the help og ngStorage tool DONE
3. user can edit  expenses, delete -- DONE
4. user can see a list of his/her expenses - DONE
5. user can require a sum of expenses for a period TODO
6. user cannot add an expense on same day -- TO DO
7. user cannot add anything else then numbers in exepense sum fields NEXT TODO
8. user cannot add an expense wich has one or more empty fields

BUG FIXING:
1. When adding a new expense there are shown the fields from previous exepense - DONE
2. usability check -- after adding it shoul gi back to listing ... DONE

CODE FIXING:
1. reorganize code TODO 
	-- make more functions TODO
	-- establish possible transitions (editing->creating->listing etc) TODO
2. clean project unnecesary files and personalize other files TODO

DESIGN:
TODO
		

Many thanks to the great tool ngStorage[1].


[1]https://github.com/gsklee/ngStorage
