use [Interior Design Firm]

-- Delete a designer who has no associated projects
DELETE FROM Designers
WHERE DesignerID = 12;
select * from Designers

-- Delete designers not specializing in 'Interior Design' with no projects
DELETE FROM Designers
WHERE Specialization <> 'Interior Design'
AND DesignerID NOT IN (SELECT DISTINCT DesignerID FROM Projects);


-- Delete 
DELETE FROM OrderItems
WHERE OrderItemID = 1;
select * from OrderItems
