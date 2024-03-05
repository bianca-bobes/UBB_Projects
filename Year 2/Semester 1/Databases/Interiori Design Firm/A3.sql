USE [Interior Design Firm];
GO
-- a. Modify the type of a column;
-- Modify the EndDate column in Projects table to DATETIME2
CREATE OR ALTER PROCEDURE ModifyColumnType_EndDate AS
BEGIN
    ALTER TABLE Projects
    ALTER COLUMN EndDate DATETIME2;

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (1, 'Modified type of EndDate column to DATETIME2');
END;

GO

-- Revert the modification of column type (a)
CREATE OR ALTER PROCEDURE RevertModifyColumnType_EndDate AS
BEGIN
    ALTER TABLE Projects
    ALTER COLUMN EndDate DATETIME;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 1;
END;

GO

-- b. Add a column to Clients table;
CREATE OR ALTER PROCEDURE AddColumn_ClientCity AS
BEGIN
    ALTER TABLE Clients
    ADD City NVARCHAR(50);

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (2, 'Added City column to Clients table');
END;

GO
-- Revert the addition of column to Clients table (b)
CREATE OR ALTER PROCEDURE RevertAddColumn_ClientCity AS
BEGIN
    ALTER TABLE Clients
    DROP COLUMN City;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 2;
END;

GO

-- c. Add a DEFAULT constraint to Designers table;
CREATE OR ALTER PROCEDURE AddDefaultConstraint_Specialization AS
BEGIN
    ALTER TABLE Designers
    ADD CONSTRAINT DF_Specialization DEFAULT 'Not Specified' FOR Specialization;

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (3, 'Added DEFAULT constraint for Specialization column in Designers table');
END;

GO

-- Revert the addition of DEFAULT constraint to Designers table (c)
CREATE OR ALTER PROCEDURE RevertAddDefaultConstraint_Specialization AS
BEGIN
    ALTER TABLE Designers
    DROP CONSTRAINT DF_Specialization;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 3;
END;

GO

-- d. Add a primary key on Clients table;
CREATE OR ALTER PROCEDURE AddPrimaryKey_ClientID AS
BEGIN
    ALTER TABLE Clients
    ADD CONSTRAINT PK_Clients_ClientID PRIMARY KEY (ClientID);

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (4, 'Added primary key on ClientID column in Clients table');
END;

GO

-- Revert the addition of primary key on Clients table (d)
CREATE OR ALTER PROCEDURE RevertAddPrimaryKey_ClientID AS
BEGIN
    ALTER TABLE Clients
    DROP CONSTRAINT PK_Clients_ClientID;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 4;
END;

GO

-- e. Add a candidate key to Projects table;
CREATE OR ALTER PROCEDURE AddCandidateKey_DesignerProject AS
BEGIN
    ALTER TABLE Projects
    ADD CONSTRAINT AK_Projects_DesignerID_ProjectID UNIQUE (DesignerID, ProjectID);

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (5, 'Added candidate key on DesignerID, ProjectID columns in Projects table');
END;

GO

-- Revert the addition of candidate key to Projects table (e)
CREATE OR ALTER PROCEDURE RevertAddCandidateKey_DesignerProject AS
BEGIN
    ALTER TABLE Projects
    DROP CONSTRAINT AK_Projects_DesignerID_ProjectID;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 5;
END;

GO

-- f. Add a foreign key to Projects table;
CREATE OR ALTER PROCEDURE AddForeignKey_Projects_Designers AS
BEGIN
    ALTER TABLE Projects
    ADD CONSTRAINT FK_Projects_DesignerID FOREIGN KEY (DesignerID) REFERENCES Designers(DesignerID);

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (6, 'Added foreign key from DesignerID in Projects table to DesignerID in Designers table');
END;

GO

-- Revert the addition of foreign key to Projects table (f)
CREATE OR ALTER PROCEDURE RevertAddForeignKey_Projects_Designers AS
BEGIN
    ALTER TABLE Projects
    DROP CONSTRAINT FK_Projects_DesignerID;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 6;
END;

GO

-- g. Create a new table;
CREATE OR ALTER PROCEDURE CreateTable_NewTable AS
BEGIN
    CREATE TABLE NewTable (
        ID INT PRIMARY KEY,
        Name NVARCHAR(50)
    );

    -- Record the change in the database versions table
    INSERT INTO DatabaseVersions (VersionNumber, ChangeDescription)
    VALUES (7, 'Created NewTable');
END;

GO

-- Revert the creation of new table (g)
CREATE OR ALTER PROCEDURE RevertCreateTable_NewTable AS
BEGIN
    DROP TABLE NewTable;

    DELETE FROM DatabaseVersions WHERE VersionNumber = 7;
END;

GO

-- Create a table to store the versions of the database schema
CREATE TABLE DatabaseVersions (
    VersionNumber INT,
    ChangeDescription NVARCHAR(MAX),
);

GO

INSERT INTO DatabaseVersions VALUES (0, 'Initial Version');

CREATE TABLE ProceduresTable (
    FromVersion INT,
    ToVersion INT,
    PRIMARY KEY(FromVersion, ToVersion),
    ProcedureName VARCHAR(100)
);

INSERT INTO ProceduresTable
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
    (6, 7, 'CreateTable_NewTable'),
    (7, 6, 'RevertCreateTable_NewTable');
GO
CREATE OR ALTER PROCEDURE GoToVersion(@NewVersion INT) 
AS
BEGIN
    DECLARE @CurrentVersion INT
    DECLARE @ProcedureName VARCHAR(100)

    SELECT @CurrentVersion = VersionNumber FROM DatabaseVersions

    IF  @NewVersion > (SELECT MAX(ToVersion) FROM ProceduresTable)
        RAISERROR ('Invalid version', 10, 1)
    ELSE
    BEGIN
        IF @NewVersion = @CurrentVersion
            PRINT('Already on this version!');
        ELSE
        BEGIN
            IF @CurrentVersion > @NewVersion
            BEGIN
                WHILE @CurrentVersion > @NewVersion
                BEGIN
                    SELECT @ProcedureName = ProcedureName FROM ProceduresTable 
                    WHERE FromVersion = @CurrentVersion AND ToVersion = @CurrentVersion - 1
                    PRINT('Executing: ' + @ProcedureName);
                    EXEC(@ProcedureName)
                    SET @CurrentVersion = @CurrentVersion - 1
                END
            END

            IF @CurrentVersion < @NewVersion
            BEGIN
                WHILE @CurrentVersion < @NewVersion
                BEGIN
                    SELECT @ProcedureName = ProcedureName FROM ProceduresTable
                    WHERE FromVersion = @CurrentVersion AND ToVersion = @CurrentVersion + 1
                    PRINT('Executing: ' + @ProcedureName);
                    EXEC (@ProcedureName)
                    SET @CurrentVersion = @CurrentVersion + 1
                END
            END

            UPDATE DatabaseVersions SET VersionNumber = @NewVersion
        END
    END
END
GO

EXEC GoToVersion 0 -- Change the version number to transition to different versions

drop table ProceduresTable;
 drop table DatabaseVersions;
-- Run additional SELECT queries as needed to check database state