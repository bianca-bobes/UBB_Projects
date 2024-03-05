use [Interior Design Firm]

-- a.1 Combine contact information of designers and clients using UNION ALL
SELECT TOP 10 ContactInfo
FROM Designers
UNION 
SELECT TOP 10 ContactInfo
FROM Clients;

-- 
SELECT TOP 5 RoomID, MaterialID,(RoomID + MaterialID) AS ADUNARE
FROM Items


-- a.2 Combine projects and rooms with 'Bathroom' in their name using OR
SELECT ProjectName, 'Project' AS ProjectType,RoomName, 'Room' AS RoomType
FROM Projects, Rooms
WHERE ProjectName LIKE '%Bathroom%' OR RoomName LIKE '%Bathroom%'
ORDER BY ProjectType;



-- b.1 Find clients who placed orders using INTERSECT
SELECT FirstName, LastName
FROM Clients
INTERSECT
SELECT C.FirstName, C.LastName
FROM Clients AS C
INNER JOIN Orders AS O ON C.ClientID = O.ClientID;

-- b.2 Find clients who have the same first name as a designer using IN
SELECT C.FirstName, C.LastName
FROM Clients AS C
WHERE C.FirstName IN (
    SELECT DISTINCT D.FirstName
    FROM Designers AS D
    WHERE D.FirstName IS NOT NULL
);

-- c.1 Find clients whose last name begins with 'P' and have not initiated any projects using EXCEPT
SELECT C.FirstName, C.LastName
FROM Clients AS C
WHERE C.LastName LIKE 'P%'
EXCEPT
SELECT C.FirstName, C.LastName
FROM Clients AS C
INNER JOIN Projects AS P ON C.ClientID = P.ClientID;


-- c.2 Find materials not supplied by any suppliers using NOT IN
SELECT MaterialName, Description
FROM Materials AS M
WHERE M.MaterialID NOT IN (
    SELECT MS.MaterialID
    FROM MaterialSuppliers AS MS
);

-- d.1 Retrieve designers, their projects, and clients using INNER JOIN, 3 TABLES
SELECT TOP 7 D.FirstName AS DesignerFirstName, D.LastName AS DesignerLastName, P.ProjectName, C.FirstName AS ClientFirstName, C.LastName AS ClientLastName
FROM Designers AS D
INNER JOIN Projects AS P ON D.DesignerID = P.DesignerID
INNER JOIN Clients AS C ON P.ClientID = C.ClientID;

-- d.2 List all rooms and their associated items, including empty rooms, using LEFT JOIN, MANY TO MANY
SELECT R.RoomName, I.ItemName, OI.OrderItemID
FROM Rooms AS R
LEFT JOIN Items AS I ON R.RoomID = I.RoomID
LEFT JOIN OrderItems AS OI ON I.ItemID = OI.ItemID
ORDER BY R.RoomName, I.ItemName;

-- d.3 Get a list of materials, their suppliers, and any suppliers without materials using RIGHT JOIN
SELECT M.MaterialName, S.SupplierName
FROM Materials AS M
RIGHT JOIN MaterialSuppliers AS MS ON M.MaterialID = MS.MaterialID
RIGHT JOIN Suppliers AS S ON MS.SupplierID = S.SupplierID;


-- d.4 Retrieve a list of materials, their suppliers, and any suppliers without materials using FULL JOIN
SELECT M.MaterialName, S.SupplierName
FROM Materials AS M
FULL JOIN MaterialSuppliers AS MS ON M.MaterialID = MS.MaterialID
FULL JOIN Suppliers AS S ON MS.SupplierID = S.SupplierID;

-- e.1 Find suppliers associated with materials from a specific category using IN and subquery
SELECT SupplierName
FROM Suppliers
WHERE SupplierID IN (
    SELECT MS.SupplierID
    FROM MaterialSuppliers AS MS
    WHERE MS.MaterialID IN (
        SELECT M.MaterialID
        FROM Materials AS M
        WHERE M.MaterialName = 'Wood'
    )
);

-- e.2 Find clients whose first names start with 'J' and have placed orders
SELECT FirstName, LastName
FROM Clients
WHERE ClientID IN (
    SELECT O.ClientID
    FROM Orders AS O
    WHERE O.ClientID IN (
        SELECT C.ClientID
        FROM Clients AS C
        WHERE C.FirstName LIKE 'J%'
    )
);



-- f.1 Retrieves designers who are currently working on projects that have not yet ended using EXISTS
SELECT FirstName, LastName
FROM Designers AS D
WHERE EXISTS (
    SELECT 1
    FROM Projects AS P
    WHERE P.DesignerID = D.DesignerID
    AND P.StartDate <= GETDATE()  -- Check if the project has started
    AND P.EndDate >= GETDATE()    -- Check if the project has not ended
);

-- f.2 Retrives suppliers that provide the "Glass" material.
SELECT S.SupplierName
FROM Suppliers AS S
WHERE EXISTS (
    SELECT 1
    FROM MaterialSuppliers AS MS
    JOIN Materials AS M ON MS.MaterialID = M.MaterialID
    WHERE MS.SupplierID = S.SupplierID
    AND M.MaterialName = 'Glass'
);
-- g.1 Query to list designers who have completed projects
SELECT D.FirstName, D.LastName
FROM (SELECT DesignerID FROM Projects WHERE EndDate < GETDATE()) AS Completed
JOIN Designers AS D ON Completed.DesignerID = D.DesignerID;

-- g.2 Retrieve rooms associated with completed projects (using the subquery in the FROM clause)
SELECT R.RoomID, R.RoomName, R.RoomDescription
FROM (SELECT ProjectID FROM Projects WHERE EndDate < GETDATE()) AS CompletedProjects
JOIN Rooms R ON CompletedProjects.ProjectID = R.ProjectID;


-- h.1 Query to find clients who have placed orders with a total quantity exceeding 3
SELECT C.FirstName, C.LastName
FROM Clients AS C
WHERE EXISTS (
    SELECT 1
    FROM Orders AS O
    JOIN OrderItems AS OI ON O.OrderID = OI.OrderID
    WHERE O.ClientID = C.ClientID
    GROUP BY O.ClientID
    HAVING SUM(OI.Quantity) > 3
)
ORDER BY C.FirstName;


-- h.2 find designers with an average project duration exceeding 60 days
SELECT D.DesignerID, D.FirstName, D.LastName
FROM Designers AS D
JOIN Projects AS P ON D.DesignerID = P.DesignerID
GROUP BY D.DesignerID, D.FirstName, D.LastName
HAVING 60 < (
    SELECT AVG(DATEDIFF(DAY, P.StartDate, P.EndDate))
    FROM Projects
    WHERE D.DesignerID = Projects.DesignerID
)
ORDER BY (
    SELECT AVG(DATEDIFF(DAY, P.StartDate, P.EndDate))
    FROM Projects
    WHERE D.DesignerID = Projects.DesignerID
);


-- h.3 find the maximum and minimum prices for each material
SELECT M.MaterialName, MAX(MS.Price) AS MaxPrice, MIN(MS.Price) AS MinPrice
FROM Materials AS M
JOIN MaterialSuppliers AS MS ON M.MaterialID = MS.MaterialID
GROUP BY M.MaterialName;


--h.4 find clients who have placed orders with a total quantity of items exceeding 5
SELECT C.ClientID, C.FirstName, C.LastName, SUM(OI.Quantity) AS TotalQuantity
FROM Clients AS C
JOIN Orders AS O ON C.ClientID = O.ClientID
JOIN OrderItems AS OI ON O.OrderID = OI.OrderID
GROUP BY C.ClientID, C.FirstName, C.LastName
HAVING SUM(OI.Quantity) > 5;

-- h.5 find the number of distinct materials supplied by each supplier
SELECT S.SupplierName, COUNT(DISTINCT MS.MaterialID) AS NumberOfMaterialsSupplied
FROM Suppliers AS S
LEFT JOIN MaterialSuppliers AS MS ON S.SupplierID = MS.SupplierID
GROUP BY S.SupplierName;

-- i.1 Find designers who have worked on projects initiated by specific clients
SELECT D.FirstName, D.LastName
FROM Designers AS D
WHERE D.DesignerID = ANY (
    SELECT P.DesignerID
    FROM Projects AS P
    WHERE P.ClientID IN (2, 4, 6)
);

SELECT D.FirstName, D.LastName
FROM Designers AS D
INNER JOIN Projects AS P ON D.DesignerID = P.DesignerID
GROUP BY D.DesignerID, D.FirstName, D.LastName
HAVING SUM(CASE WHEN P.ClientID IN (2, 4, 6) THEN 1 ELSE 0 END) > 0;



-- i.2 Find projects with rooms that contain any item made of wood
SELECT DISTINCT P.ProjectName, R.RoomName
FROM Projects AS P
JOIN Rooms AS R ON P.ProjectID = R.ProjectID
WHERE R.RoomID = ANY (
    SELECT DISTINCT I.RoomID
    FROM Items AS I
    WHERE I.MaterialID IN (SELECT MaterialID FROM Materials WHERE MaterialName = 'Wood')
);

SELECT DISTINCT P.ProjectName, R.RoomName
FROM Projects AS P
JOIN Rooms AS R ON P.ProjectID = R.ProjectID
WHERE P.ProjectID IN (
    SELECT DISTINCT P.ProjectID
    FROM Projects AS P
    WHERE R.RoomID IN (
        SELECT DISTINCT I.RoomID
        FROM Items AS I
        WHERE I.MaterialID IN (SELECT MaterialID FROM Materials WHERE MaterialName = 'Wood')
    )
);



-- i.3 Find projects with rooms that contain items made entirely of wood.
SELECT DISTINCT P.ProjectName, R.RoomName
FROM Projects AS P
JOIN Rooms AS R ON P.ProjectID = R.ProjectID
WHERE R.RoomID = ALL (
    SELECT DISTINCT I.RoomID
    FROM Items AS I
    WHERE I.MaterialID IN (SELECT MaterialID FROM Materials WHERE MaterialID LIKE 1)
);

SELECT DISTINCT P.ProjectName, R.RoomName
FROM Projects AS P
JOIN Rooms AS R ON P.ProjectID = R.ProjectID
WHERE R.RoomID IN (
    SELECT DISTINCT I.RoomID
    FROM Items AS I
    WHERE I.MaterialID IN (SELECT MaterialID FROM Materials WHERE MaterialID = 1)
);



--i.4 Find designers who have not worked on projects before a specific date:
SELECT D.FirstName, D.LastName
FROM Designers AS D
WHERE D.DesignerID <= ALL(
    SELECT P.DesignerID
    FROM Projects AS P
    WHERE P.EndDate < '2023-04-01'
);


SELECT D.FirstName, D.LastName
FROM Designers AS D
LEFT JOIN Projects AS P ON D.DesignerID = P.DesignerID
GROUP BY D.DesignerID, D.FirstName, D.LastName
HAVING MAX(P.EndDate) < '2023.04.01';





