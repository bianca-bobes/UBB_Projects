--USE [Interior Design Firm]

-- a. Modify the type of a column;

CREATE OR ALTER PROCEDURE ModifyColumnType_EndDate 
AS
	ALTER TABLE Projects
		ALTER COLUMN EndDate DATETIME2;
GO


-- Revert the modification of column type (a)
CREATE OR ALTER PROCEDURE RevertModifyColumnType_EndDate 
AS
    ALTER TABLE Projects
		ALTER COLUMN EndDate DATETIME;
GO

-- b. Add a column to Clients table;
CREATE OR ALTER PROCEDURE AddColumn_ClientCity 
AS
    ALTER TABLE Clients
		ADD City NVARCHAR(50);
GO
-- Revert the addition of column to Clients table (b)
CREATE OR ALTER PROCEDURE RevertAddColumn_ClientCity 
AS
    ALTER TABLE Clients
		DROP COLUMN City;
GO

-- c. Add a DEFAULT constraint to Designers table;
CREATE OR ALTER PROCEDURE AddDefaultConstraint_Specialization 
AS
    ALTER TABLE Designers
		ADD CONSTRAINT DF_Specialization DEFAULT 'Not Specified' FOR Specialization;

GO

-- Revert the addition of DEFAULT constraint to Designers table (c)
CREATE OR ALTER PROCEDURE RevertAddDefaultConstraint_Specialization 
AS
    ALTER TABLE Designers
		DROP CONSTRAINT DF_Specialization;
GO

-- d. Add a primary key on Clients table;
CREATE OR ALTER PROCEDURE AddPrimaryKey_CEOID
AS
    ALTER TABLE CEOS
		ADD CONSTRAINT PK_CEOS_CEOID PRIMARY KEY (CeoID);
GO

-- Revert the addition of primary key on Clients table (d)
CREATE OR ALTER PROCEDURE RevertAddPrimaryKey_CEOID 
AS
	ALTER TABLE CEOS
		DROP CONSTRAINT IF EXISTS PK_CEOS_CEOID
GO


-- e. Add a candidate key to Projects table;
CREATE OR ALTER PROCEDURE AddCandidateKey_DesignerProject
AS
    ALTER TABLE Projects
		ADD CONSTRAINT AK_Projects_DesignerID_ProjectID UNIQUE (DesignerID, ProjectID);
GO

-- Revert the addition of candidate key to Projects table (e)
CREATE OR ALTER PROCEDURE RevertAddCandidateKey_DesignerProject 
AS
    ALTER TABLE Projects
		DROP CONSTRAINT IF EXISTS AK_Projects_DesignerID_ProjectID;
GO

-- f. Add a foreign key to Projects table;
CREATE OR ALTER PROCEDURE AddForeignKey_Projects_Designers 
AS
    ALTER TABLE Projects
		ADD CONSTRAINT FK_Projects_DesignerID FOREIGN KEY (DesignerID) REFERENCES Designers(DesignerID);
GO

-- Revert the addition of foreign key to Projects table (f)
CREATE OR ALTER PROCEDURE RevertAddForeignKey_Projects_Designers 
AS
    ALTER TABLE Projects
		DROP CONSTRAINT IF EXISTS FK_Projects_DesignerID;
GO

-- g. Create a new table;
CREATE OR ALTER PROCEDURE CreateSecretary
AS
    CREATE TABLE Secretary (
        ID INT PRIMARY KEY,
        Name NVARCHAR(50)
    );
GO

-- Revert the creation of new table (g)
CREATE OR ALTER PROCEDURE RevertCreateSecretary 
AS
    DROP TABLE Secretary;
GO

-- versions table

CREATE TABLE versionsTable (
	version INT
)

INSERT INTO versionsTable VALUES (1) --the initial version

CREATE TABLE proceduresTable (
	fromVersion INT,
	toVersion INT,
	PRIMARY KEY(fromVersion, toVersion),
	procedureName VARCHAR(100)
)

INSERT INTO proceduresTable
VALUES
    (0, 1, 'ModifyColumnType_EndDate'),
    (1, 0, 'RevertModifyColumnType_EndDate'),
    (1, 2, 'AddColumn_ClientCity'),
    (2, 1, 'RevertAddColumn_ClientCity'),
    (2, 3, 'AddDefaultConstraint_Specialization'),
    (3, 2, 'RevertAddDefaultConstraint_Specialization'),
    (3, 4, 'AddPrimaryKey_ClientID'),
    (4, 3, 'RevertAddPrimaryKey_ClientID'),
    (4, 5, 'AddCandidateKey_DesignerProject'),
    (5, 4, 'RevertAddCandidateKey_DesignerProject'),
    (5, 6, 'AddForeignKey_Projects_Designers'),
    (6, 5, 'RevertAddForeignKey_Projects_Designers'),
    (6, 7, 'CreateSecretary'),
    (7, 6, 'RevertCreateSecretary');
GO



/*
EXEC RevertAddPrimaryKey_ClientID
EXEC RevertAddCandidateKey_DesignerProject
EXEC RevertAddColumn_ClientCity
EXEC RevertAddDefaultConstraint_Specialization
EXEC RevertAddForeignKey_Projects_Designers
EXEC RevertCreateSecretary
EXEC RevertModifyColumnType_EndDate*/

CREATE OR ALTER PROCEDURE goToVersion(@newVersion INT) 
AS
	DECLARE @curr INT
	DECLARE @procedureName VARCHAR(100)
	SELECT @curr = version FROM versionsTable

	IF  @newVersion > (SELECT MAX(toVersion) FROM proceduresTable)
		RAISERROR ('Bad version', 10, 1)
	ELSE
	BEGIN
		IF @newVersion = @curr
			PRINT('Already on this version!');
		ELSE
		BEGIN
			IF @curr > @newVersion
			BEGIN
				WHILE @curr > @newVersion
				BEGIN
					SELECT @procedureName = procedureName FROM proceduresTable 
					WHERE fromVersion = @curr AND toVersion = @curr - 1
					PRINT('executing: ' + @procedureName);
					EXEC(@procedureName)
					SET @curr = @curr - 1
				END
			END

			IF @curr < @newVersion
			BEGIN
				WHILE @curr < @newVersion
					BEGIN
						SELECT @procedureName = procedureName FROM proceduresTable
						WHERE fromVersion = @curr AND toVersion = @curr + 1
						PRINT('executing: ' + @procedureName);
						EXEC (@procedureName)
						SET @curr = @curr + 1
					END
			END

			UPDATE versionsTable SET version = @newVersion
		END
	END
GO


EXEC goToVersion 0
EXEC goToVersion 1
EXEC goToVersion 2
EXEC goToVersion 3
EXEC goToVersion 4
EXEC goToVersion 5
EXEC goToVersion 6
EXEC goToVersion 7
EXEC goToVersion 8


--SELECT * FROM proceduresTable;
SELECT * FROM versionsTable;

SELECT * FROM ProceduresTable
