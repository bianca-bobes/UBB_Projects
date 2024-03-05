;Write recursive Lisp functions for the following problems (optionally, you may use MAP functions):
;A binary tree is memorised in the following two ways:
;(node no-subtrees list-subtree-1 list-subtree-2 ...) (1)
;(node (list-subtree-1) (list-subtree-2) ...) (2)
;As an example, the tree
; A
;/ \
;B C
; / \
; D  E
;is represented as follows:
;(A (B) (C (D) (E))) (2)
;10. Return the level of a node X in a tree of type (2). The level of the root element is 0.

; (car l) - the first element of the list is the root of the tree
; (cadr l) - the second element of the list, at superficial level, is the left subtree
; (caddr l) - the third element of the list, at the superficial level, is the right subtree

; mathematical model:
; findlevel(l1l2l3, node, level) = { nil, if l is empty
;                                  { level, if l1 = node
;                                  { findlevel(l2, node, level+1) OR findlevel(l3, node, level+1), otherwise

;wrapper(tree node)={ findlevel(tree node 0) }

(defun findlevel (tree node level)
  (cond
    ((null tree) nil) ; If the tree is empty, return nil
    ((equal (car tree) node) level) ; If the current node is the target node, return the current level
    (t (or (findlevel (cadr tree) node (+ level 1)) ; Recursively search in the left subtree
           (findlevel (caddr tree) node (+ level 1)))) ; Recursively search in the right subtree
    )
)

(defun wrapper(tree node)
    (findlevel tree node 0)
    )

(print (wrapper '(A (B (D (E (F(G)(H(J)(K))))))(C(L(N)(Q(P)(R)))(M))) 'Q))

 

