; exercise 13

; a) A linear list is given. Eliminate from the list all elements from N to N steps, N-given.

; mathematical model:
; removefromNtoN(l1l2...lm, n, k) = { nil, if m = 0
;                                   { l1l2...lm, if n is not a number
;                                   { removefromNtoN(l2...lm, n, n), if k = 1
;                                   { {l1} U removefromNtoN(l2...lm, n, k-1), otherwise

; removefromNtoN(l: list, n: the step, k: a counter)

(defun removefromNtoN (l n k)
    (cond
        ((null l) nil)
        ((not (numberp n)) l)
        ((equal k 1) (removefromNtoN (cdr l) n n))
        (t (cons (car l) (removefromNtoN (cdr l) n (- k 1))))
    )
)

(defun mainremove (l n)
    (removefromNtoN l n n)
)

(print (mainremove '(1 2 3 4 5) '2))

; b) Write a function to test if a linear list of integer numbers has a "valley" aspect (a list has a valley 
; aspect if the items decrease to a certain point and then increase. Eg. 10 8 6 17 19 20). A list must have 
; at least 3 elements to fullfill this condition.

; f = 0 for an decreasing sequence
; f = 1 for a increasing sequence
; mathematical model:
; valley(l1l2...ln, f) = { t, if n <= 1 and f = 1
;                        { valley(l2...ln, 0), if l1 >= l2 and f = 0
;                        { valley(l2...ln, 1), if l1 <= l2 and f = 0
;                        { valley(l2...ln, 1), if l1 <= l2 and f = 1
;                        { nil, otherwise

(defun valley (l f)
    (cond
        ((and (null (cdr l)) (= f 1)) t)
        ((and (>= (car l) (cadr l)) (= f 0)) (valley (cdr l) 0))
        ((and (<= (car l) (cadr l)) (= f 0)) (valley (cdr l) 1))
        ((and (<= (car l) (cadr l)) (= f 1)) (valley (cdr l) 1))
        (t nil)
    )
)

(defun mainvalley (l)
    (cond 
        ((null l) nil)
        ((null (cadr l)) nil)
        ((<= (car l) (car(cdr l))) nil )
        (t (valley l 0))
    )
)

(print (mainvalley '(6 17 19 20)))


; c) Build a function that returns the minimum numeric atom from a list, at any level.

; mathematical model:
; mymin(a, b) = { a, if b is not a number
;               { b, if a is not a number
;               { a, if a <= b
;               { b, otherwise

(defun mymin (a b)
    (cond
        ((not (numberp b)) a)
        ((not (numberp a)) b)
        ((<= a b) a)
        (t b)
    )
)

; mathematical model:
; minlist(l1l2...ln) = { nil, if n = 0
;                      { mymin(l1, minlist(l2...ln)), if l1 is an atom
;                      { mymin(minlist(l1), minlist(l2...ln)), otherwise

(defun minlist (l)
    (cond
        ((null l) nil)
        ((atom (car l)) (mymin (car l) (minlist (cdr l))))
        (t (mymin (minlist (car l)) (minlist (cdr l))))
    )
)

(print (minlist '(5 2 (6 1) a 6 7 1)))


; d) Write a function that deletes from a linear list of all occurrences of the maximum element.

; mathematical model:
; mymax(a, b) = { a, if b is not a number
;               { b, if a is not a number
;               { a, if a >= b
;               { b, otherwise

(defun mymax (a b)
    (cond
        ((not (numberp b)) a)
        ((not (numberp a)) b)
        ((>= a b) a)
        (t b)
    )
)

; mathematical model:
; maxlist(l1l2...ln) = { nil, if n = 0
;                      { mymax(l1, maxlist(l2...ln)), if l1 is an atom
;                      { mymax(maxlist(l1), maxlist(l2...ln)), otherwise

(defun maxlist (l)
    (cond
        ((null l) nil)
        ((atom (car l)) (mymax (car l) (maxlist (cdr l))))
        (t (mymax (maxlist (car l)) (maxlist (cdr l))))
    )
)

; mathematical model:
; myremove(l1l2...ln, e) = { nil, if n = 0
;                          { nil, if l1 = e and n = 1
;                          { myremove(l2...ln, e), if l1 = e
;                          { {l1} U myremove(l2...ln, e), otherwise

(defun myremove (l e)
    (cond
        ((null l) nil)
        ((and (equal (car l) e) (null (cdr l))) nil)
        ((equal (car l) e) (myremove (cdr l) e))
        (t (cons (car l) (myremove (cdr l) e)))
    )
)

(defun removemax (l)
    (myremove l (maxlist l))
)

(print (removemax '(6 4 3 2 6 2 4 5 1 6)))
