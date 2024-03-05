use [Interior Design Firm]
-- Insert data into Designers Table
INSERT INTO Designers (DesignerID, FirstName, LastName, ContactInfo, Specialization)
VALUES
    (1, 'John', 'Smith', 'john.smith@example.com', 'Interior Design'),
    (2, 'Mary', 'Johnson', 'mary.johnson@example.com', 'Furniture Design'),
    (3, 'David', 'Wilson', 'david.wilson@example.com', 'Interior Design'),
    (4, 'Susan', 'Jones', 'susan.jones@example.com', 'Interior Design'),
    (5, 'Robert', 'Miller', 'robert.miller@example.com', 'Furniture Design'),
    (6, 'Linda', 'Davis', 'linda.davis@example.com', 'Interior Design'),
    (7, 'William', 'Brown', 'william.brown@example.com', 'Interior Design'),
    (8, 'Patricia', 'Taylor', 'patricia.taylor@example.com', 'Furniture Design'),
    (9, 'James', 'Anderson', 'james.anderson@example.com', 'Interior Design'),
    (10, 'Jennifer', 'Evans', 'jennifer.evans@example.com', 'Interior Design'),
    (11, 'Charles', 'Garcia', 'charles.garcia@example.com', 'Furniture Design'),
    (12, 'Margaret', 'Martinez', 'margaret.martinez@example.com', 'Interior Design'),
    (13, 'Thomas', 'Hernandez', 'thomas.hernandez@example.com', 'Interior Design'),
    (14, 'Karen', 'Lopez', 'karen.lopez@example.com', 'Furniture Design'),
    (15, 'Michael', 'Wright', 'michael.wright@example.com', 'Interior Design');


INSERT INTO Designers (DesignerID, FirstName, LastName, ContactInfo, Specialization)
VALUES
	(11, 'Charles', 'Garcia', 'charles.garcia@example.com', 'Furniture Design'),
	(14, 'Karen', 'Lopez', 'karen.lopez@example.com', 'Furniture Design'),
    (15, 'Michael', 'Wright', 'michael.wright@example.com', 'Interior Design');

-- Insert data into Clients Table
INSERT INTO Clients (ClientID, FirstName, LastName, ContactInfo)
VALUES
    (1, 'Sarah', 'Clark', 'sarah.clark@example.com'),
    (2, 'Daniel', 'White', 'daniel.white@example.com'),
    (3, 'Emily', 'Adams', 'emily.adams@example.com'),
    (4, 'Christopher', 'Hall', 'christopher.hall@example.com'),
    (5, 'Megan', 'Baker', 'megan.baker@example.com'),
    (6, 'Nicholas', 'Scott', 'nicholas.scott@example.com'),
    (7, 'Jessica', 'Green', 'jessica.green@example.com'),
    (8, 'Kevin', 'Carter', 'kevin.carter@example.com'),
    (9, 'Laura', 'Stewart', 'laura.stewart@example.com'),
    (10, 'Matthew', 'Turner', 'matthew.turner@example.com'),
    (11, 'Olivia', 'Wood', 'olivia.wood@example.com'),
    (12, 'Andrew', 'Morris', 'andrew.morris@example.com'),
    (13, 'Amanda', 'Allen', 'amanda.allen@example.com'),
    (14, 'Joseph', 'Young', 'joseph.young@example.com'),
    (15, 'Hannah', 'Harris', 'hannah.harris@example.com'),
    (16, 'David', 'Cook', 'david.cook@example.com'),
    (17, 'Elizabeth', 'King', 'elizabeth.king@example.com'),
    (18, 'John', 'Price', 'john.price@example.com'),
    (19, 'Catherine', 'Long', 'catherine.long@example.com'),
    (20, 'Brian', 'Parker', 'brian.parker@example.com');

-- Insert data into Projects Table
INSERT INTO Projects (ProjectID, ProjectName, ProjectDescription, StartDate, EndDate, DesignerID, ClientID)
VALUES
    (1, 'Living Room Redesign', 'Redesign of the living room', '2023-01-15', '2023-02-28', 1, 1),
    (2, 'Kitchen Remodel', 'Complete kitchen renovation', '2023-03-01', '2023-04-30', 2, 2),
    (3, 'Office Space Makeover', 'Makeover of an office space', '2023-02-10', '2023-03-20', 3, 3),
    (4, 'Bathroom Renovation', 'Renovation of a bathroom', '2023-04-05', '2023-05-15', 4, 4),
    (5, 'Dining Room Redesign', 'Redesign of the dining room', '2023-05-01', '2023-06-10', 5, 5),
    (6, 'Bedroom Transformation', 'Transformation of a bedroom', '2023-03-10', '2023-04-20', 6, 6),
    (7, 'Outdoor Patio Design', 'Design of an outdoor patio', '2023-06-01', '2023-07-15', 7, 7),
    (8, 'Home Office Setup', 'Setting up a home office', '2023-05-20', '2023-06-30', 8, 8),
    (9, 'Library Renovation', 'Renovation of a library', '2023-04-01', '2023-05-10', 9, 9),
    (10, 'Garden Landscape Design', 'Design of a garden landscape', '2023-07-01', '2023-08-15', 10, 10);

-- Insert data into Orders Table
INSERT INTO Orders (OrderID, OrderDate, ClientID)
VALUES
    (1, '2023-01-20', 11),
    (2, '2023-02-05', 12),
    (3, '2023-02-10', 13),
    (4, '2023-03-15', 14),
    (5, '2023-04-02', 15),
    (6, '2023-05-05', 16),
    (7, '2023-06-10', 17),
    (8, '2023-07-15', 18),
    (9, '2023-08-20', 19),
    (10, '2023-09-25', 20);

-- Insert data into Items Table
INSERT INTO Items (ItemID, ItemName, ItemDescription, RoomID)
VALUES
    (1, 'Sofa', 'Comfortable living room sofa', 1),
    (2, 'Dining Table', 'Elegant dining table', 5),
    (3, 'Bed', 'King-size bed with headboard', 6),
    (4, 'Office Desk', 'Modern office desk', 8),
    (5, 'Bookshelf', 'Tall bookshelf for library', 9),
    (6, 'Armchair', 'Cozy armchair for reading', 1),
    (7, 'Dresser', 'Bedroom dresser with mirror', 6);


INSERT INTO Items (ItemID, ItemName, ItemDescription, RoomID,MaterialID)
VALUES
	(8, 'Window', 'Bathroom window',4,3),
	(9, 'Countertop','Kitchen countertop',2,5),
	(10,'Chair','Dinning room leather chair',5,9);
-- Insert data into Rooms Table
INSERT INTO Rooms (RoomID, RoomName, RoomDescription, ProjectID)
VALUES
	(1, 'Living Room', 'Cozy living room with a view', 1),
    (2, 'Kitchen', 'Spacious and modern kitchen', 2),
    (3, 'Home Office', 'Functional home office space', 3),
  
	(7, 'Living Room', 'Cozy living room with a view', 1),
    (8, 'Kitchen', 'Spacious and modern kitchen', 2),
    (9, 'Home Office', 'Functional home office space', 3),
    (10, 'Master Bedroom', 'Luxurious master bedroom', 4),
    (11, 'Library', 'Classic library with built-in shelves', 5),
    (12, 'Guest Room', 'Inviting guest bedroom', 6),
    (13, 'Bathroom', 'Contemporary bathroom design', 7),
    (14, 'Dining Room', 'Elegant dining area', 8),
    (15, 'Outdoor Patio', 'Outdoor relaxation and dining space', 9),
    (16, 'Garden', 'Beautiful garden landscape', 10);

-- Insert data into Suppliers Table
INSERT INTO Suppliers (SupplierID, SupplierName, ContactInfo)
VALUES
    (3, 'Home Decor Haven', 'info@homedecorhaven.com'),
    (4, 'Bathroom Bliss', 'contact@bathroombliss.com');

-- Insert additional suppliers
INSERT INTO Suppliers (SupplierID,SupplierName, ContactInfo)
VALUES (1,'Stone World Suppliers', 'contact@stoneworld.com'),
       (2,'Glassworks Inc.', 'info@glassworksinc.com'),
       (5,'LeatherCrafters', 'sales@leathercrafters.com'),
	   (6,'WoodWorkers','woodsales@www.com');


-- Insert data into Materials Table
INSERT INTO Materials (MaterialID, MaterialName, Description)
VALUES
    (3, 'Glass', 'High-quality tempered glass for shower enclosures'),
    (4, 'Metal', 'Sturdy metal for dining table legs');

insert into Materials (MaterialID, MaterialName, Description)
values
	(2, 'Wood', 'Beech Wood');

-- Insert more wood materials
INSERT INTO Materials (MaterialID,MaterialName, Description)
VALUES (1,'Oak Wood', 'High-quality oak wood for furniture and flooring'),
       (8,'Walnut Wood', 'Beautiful walnut wood for fine cabinetry'),
       (6,'Cherry Wood', 'Cherry wood for elegant woodworking projects'),
	   (5,'Marble', 'High-quality marble for countertops'),
       (7,'Glass', 'Clear tempered glass for windows'),
       (9,'Leather', 'Genuine leather upholstery for furniture');


-- Insert data into MaterialSuppliers Table
INSERT INTO MaterialSuppliers (MaterialSupplierID, MaterialID, SupplierID, Price)
VALUES
    (3, 3, 4, 150.00),
    (4, 4, 3, 200.00);
INSERT INTO MaterialSuppliers (MaterialSupplierID, MaterialID, SupplierID, Price)
VALUES
	(1,1,6,100.00),
	(2,2,6,99.99),
	(5,5,1,250.00),
	(6,6,6,166.89),
	(7,7,2,170.00),
	(8,8,6,200.45),
	(9,9,5,450.00);

-- Insert data into OrderItems Table
INSERT INTO OrderItems (OrderItemID, OrderID, ItemID, Quantity)
VALUES
    (3, 3, 6, 1),
    (4, 4, 4, 1);

INSERT INTO OrderItems (OrderItemID, OrderID, ItemID, Quantity)
VALUES
	(1,1,6,5)



--Inserts a project that violates referential integrity by specifying a non-existent DesignerID (DesignerID 99)
INSERT INTO Projects (ProjectID, ProjectName, ProjectDescription, StartDate, EndDate, DesignerID, ClientID)
VALUES
   (11, 'Invalid Project', 'This project violates referential integrity', '2023-03-01', '2023-03-31', 99, 8);


-- Select all rows from the Designers Table
SELECT * FROM Designers;

-- Select all rows from the Clients Table
SELECT * FROM Clients;

-- Select all rows from the Projects Table
SELECT * FROM Projects;

-- Select all rows from the Rooms Table
SELECT * FROM Rooms;

-- Select all rows from the Items Table
SELECT * FROM Items;
-- Select all rows from the Orders Table
SELECT * FROM Orders;

-- Select all rows from the OrderItems Table
SELECT * FROM OrderItems;

-- Select all rows from the Suppliers Table
SELECT * FROM Suppliers;

-- Select all rows from the Materials Table
SELECT * FROM Materials;

-- Select all rows from the MaterialSuppliers Table
SELECT * FROM MaterialSuppliers;


