use [Interior Design Firm]

DROP TABLE IF EXISTS NewDesigners
DROP TABLE IF EXISTS NewSecretaries
DROP TABLE IF EXISTS NewRelationships

CREATE TABLE NewDesigners (
    NewDesignerID INT PRIMARY KEY,
    FirstName VARCHAR(50) UNIQUE,
    LastName VARCHAR(50),
    ContactInfo VARCHAR(255),
    Specialization VARCHAR(100)
);

CREATE TABLE NewSecretaries (
    NewSecretaryID INT PRIMARY KEY,
    FirstName VARCHAR(50) UNIQUE,
    LastName VARCHAR(50),
    ContactInfo VARCHAR(255),
    Specialization VARCHAR(100)
);

CREATE TABLE NewRelationships (
    RelationshipID INT PRIMARY KEY,
    NewDesignerID INT,
    NewSecretaryID INT,
    FOREIGN KEY (NewDesignerID) REFERENCES NewDesigners(NewDesignerID),
    FOREIGN KEY (NewSecretaryID) REFERENCES NewSecretaries(NewSecretaryID)
);

-- Create a stored procedure to insert 10,000 random records
go

DROP PROCEDURE IF EXISTS InsertRandomData;
GO

CREATE PROCEDURE InsertRandomData (@rows INT)
AS
BEGIN
    DECLARE @counter INT = 1;

    WHILE @counter <= @rows
    BEGIN
        DECLARE @FirstName VARCHAR(50) = CONCAT('FirstName_', @counter);
        DECLARE @LastName VARCHAR(50) = CONCAT('LastName_', @counter);
        DECLARE @ContactInfo VARCHAR(255) = CONCAT('Contact_', @counter);
        DECLARE @Specialization VARCHAR(100) = CONCAT('Specialization_', @counter);

        -- Insert into NewDesigners table
        INSERT INTO NewDesigners (NewDesignerID, FirstName, LastName, ContactInfo, Specialization)
        VALUES (@counter, @FirstName, @LastName, @ContactInfo, @Specialization);

        -- Insert into NewSecretaries table
        INSERT INTO NewSecretaries (NewSecretaryID, FirstName, LastName, ContactInfo, Specialization)
        VALUES (@counter, @FirstName, @LastName, @ContactInfo, @Specialization);

        SET @counter = @counter + 1;
    END;
END;


 exec InsertRandomData 10000
 
 drop procedure InsertRandomData
 go
 DROP PROCEDURE IF EXISTS InsertRandomDataIntoNewRelationships;
GO

CREATE PROCEDURE InsertRandomDataIntoNewRelationships (@rows INT)
AS
BEGIN
    DECLARE @counter INT = 1;

    WHILE @counter <= @rows
    BEGIN
        DECLARE @NewDesignerID INT = CAST(RAND() * 10000 AS INT); -- Assuming NewDesignerID range is up to 10,000
        DECLARE @NewSecretaryID INT = CAST(RAND() * 10000 AS INT); -- Assuming NewSecretaryID range is up to 10,000

        -- Insert into NewRelationships table
        INSERT INTO NewRelationships (RelationshipID, NewDesignerID, NewSecretaryID)
        VALUES (@counter, @NewDesignerID, @NewSecretaryID);

        SET @counter = @counter + 1;
    END;
END;
GO

exec InsertRandomDataIntoNewRelationships 10000
--a.
-- Clustered Index Scan
SELECT * FROM NewDesigners;
-- Clustered Index Seek
SELECT * FROM NewDesigners WHERE NewDesignerID = 1;
-- Nonclustered Index Scan
CREATE INDEX IX_FirstName ON NewDesigners(FirstName);
SELECT * FROM NewDesigners WHERE FirstName LIKE 'A%';
-- Nonclustered Index Seek

SELECT Specialization FROM NewDesigners 
WHERE Specialization = 'Interior';

-- Key Lookup
SELECT NewDesignerID, FirstName FROM NewDesigners WHERE NewDesignerID = 1;
Drop  index IX_SecretaryID ON NewSecretaries
--b.
-- Creating a nonclustered index to optimize the query
-- Query with WHERE clause on NewSecretaries
SELECT NewSecretaryID FROM NewSecretaries WHERE  Specialization = 'Interior'; 

-- Creating a nonclustered index on SecretaryID column
CREATE NONCLUSTERED INDEX IX_SecretaryID ON NewSecretaries(Specialization);

-- Re-executing the query to examine the updated execution plan
SELECT  NewSecretaryID FROM NewSecretaries WHERE Specialization = 'Interior';

--c.
-- Creating a view joining NewDesigners and NewSecretaries

CREATE OR ALTER VIEW EmployeesView AS
SELECT 
    ND.FirstName AS DesignerFirstName,
    ND.LastName AS DesignerLastName,
    ND.Specialization AS Specialisation,
    NS.FirstName AS SecretaryFirstName,
    NS.LastName AS SecretaryLastName
FROM NewDesigners AS ND
JOIN NewRelationships AS NR ON ND.NewDesignerID = NR.NewDesignerID
JOIN NewSecretaries AS NS ON NS.NewSecretaryID = NR.NewSecretaryID;

SELECT * FROM EmployeesView;
DECLARE @startWithoutIndex DATETIME = GETDATE();
SELECT * FROM EmployeesView;
DECLARE @endWithoutIndex DATETIME = GETDATE();

PRINT 'WITHOUT INDEXES: Start: ' + CONVERT(NVARCHAR(MAX), @startWithoutIndex) + ', End: ' + CONVERT(NVARCHAR(MAX), @endWithoutIndex) 
    + ', Total time: ' + CONVERT(NVARCHAR(MAX), DATEDIFF(millisecond, @startWithoutIndex, @endWithoutIndex)) + ' milliseconds';
create nonclustered index index1 on NewDesigners (FirstName)
create nonclustered index index2 on NewSecretaries(FirstName)
-- Display the data from the view after adding indexes
SELECT * FROM EmployeesView;

-- Measure the performance with indexes
DECLARE @startWithIndex DATETIME = GETDATE();
SELECT * FROM EmployeesView;
DECLARE @endWithIndex DATETIME = GETDATE();

PRINT 'WITH INDEXES: Start: ' + CONVERT(NVARCHAR(MAX), @startWithIndex) + ', End: ' + CONVERT(NVARCHAR(MAX), @endWithIndex) 
    + ', Total time: ' + CONVERT(NVARCHAR(MAX), DATEDIFF(millisecond, @startWithIndex, @endWithIndex)) + ' milliseconds';