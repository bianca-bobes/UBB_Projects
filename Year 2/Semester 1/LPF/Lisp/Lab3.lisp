; 10. Define a function that replaces one node with another one in a n-tree represented as: root
;     list_of_nodes_subtree1... list_of_nodes_subtreen)
;     Eg: tree is (a (b (c)) (d) (e (f))) and node 'b' will be replace with node 'g' => tree (a (g (c)) (d) (e (f)))}


; myReplace(tree, elem, newElem)
; = newElem, if tree = elem and tree is an atom
; = tree, if tree is an atom and tree != elem
; = myReplace(tree1, elem, newElem) U myReplace(tree2, elem, newElem) U ... U myReplace(treen, elem, newElem), otherwise


(defun myReplace(tree elem newElem)
  (cond
    ((and (atom tree) (equal tree elem)) newElem)
    ((atom tree) tree)
    (t (mapcar #' (lambda (a) (myReplace a elem newElem)) tree))
  )
)
print 
(defun wrapper(tree elem newElem)
  (myReplace tree elem newElem)
  )

(print(wrapper '(a (b (c)) (d) (e (f))) 'b 'g))