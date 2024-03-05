(defun f(l1 l2)
    (append (f (car l1) l2)
        (cond
        ((null l1)(cdr l2))
        (T(list (f(car l1) l2) (car l2)))
        )
    )
)
(print (f '(a (b c) d) ((l m)(n o p))))