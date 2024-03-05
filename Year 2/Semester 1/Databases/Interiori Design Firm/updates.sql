use [Interior Design Firm]


-- Changes project description for a specific project
UPDATE Projects
SET ProjectDescription = 'DESCRIPTION UPDATE'--Renovation of a bathroom
WHERE ProjectID = 4;
select * from Projects




-- Updates client contact information
UPDATE Clients
SET ContactInfo = 'updated.email@example.com'
WHERE ClientID = 2;
select * from Clients

-- Increases quantity for a specific order item
UPDATE OrderItems
SET Quantity = Quantity + 5
WHERE OrderID = 1 AND ItemID = 6;
select * from OrderItems

-- Increases quantity for a specific order item that has the quantity between 0 and 10
UPDATE OrderItems
SET Quantity = Quantity + 3
WHERE Quantity BETWEEN 0 AND 10
select * from OrderItems


-- Update the Projects that are after a specific date and have 'office' in their description 
UPDATE Projects
SET EndDate = '2023-05-31'
WHERE StartDate > '2023-04-01' AND ProjectDescription LIKE '%office%';
select * from Projects



UPDATE Projects
SET EndDate = '2023-12-31'
WHERE StartDate > '2023-05-01';
select * from Projects

UPDATE Clients
SET FirstName = 'Mary'
WHERE ClientID = 5
select * from Clients
select * from Designers

update Materials
set MaterialName = 'Wood'
where MaterialName like '%Wood%'
select * from Materials

-- Update the Items Table to specify the MaterialID for each item
UPDATE Items
SET MaterialID = 1
WHERE ItemName IN ('Sofa', 'Armchair');

UPDATE Items
SET MaterialID = 2
WHERE ItemName = 'Dining Table';

UPDATE Items
SET MaterialID = 2
WHERE ItemName = 'Dresser';

UPDATE Items
SET MaterialID = 3
WHERE ItemName = 'Office Desk';

UPDATE Items
SET MaterialID = 2
Where ItemName = 'Bed';

UPDATE Items
SET MaterialID = 2
Where ItemName = 'Bookshelf';




-- Verify the changes
SELECT * FROM Items;

select * from Materials
select * from Items

UPDATE Projects
SET ProjectName = 'Kitchen and Dinning Room Remodel'
WHERE ProjectName LIKE 'Kitchen Remodel';

UPDATE Rooms
SET ProjectID = 10
WHERE RoomID LIKE 7
SELECT * FROM Rooms

UPDATE Items
SET RoomID = 4
WHERE ItemID LIKE 2

UPDATE Items
SET RoomID = 4
WHERE ItemID LIKE 10

select *from Items


