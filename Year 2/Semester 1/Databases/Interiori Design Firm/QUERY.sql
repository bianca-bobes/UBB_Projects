use [Interior Design Firm]

-- Create Designers Table
CREATE TABLE Designers (
    DesignerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    ContactInfo VARCHAR(255),
    Specialization VARCHAR(100)
);

CREATE TABLE Secretaries(
	SecretaryID INT PRIMARY KEY,
	FirstName VARCHAR(50),
    LastName VARCHAR(50),
    ContactInfo VARCHAR(255),
    Specialization VARCHAR(100)
);


-- Create Clients Table
CREATE TABLE Clients (
    ClientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    ContactInfo VARCHAR(255)
);

CREATE TABLE CEOS(
	CeoID INT ,
	NAME VARCHAR(50));
	ALTER TABLE CEOS
ALTER COLUMN CeoID INT NOT NULL;

-- Create Projects Table
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100),
    ProjectDescription VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    DesignerID INT,
    ClientID INT,
    FOREIGN KEY (DesignerID) REFERENCES Designers (DesignerID),
    FOREIGN KEY (ClientID) REFERENCES Clients (ClientID)
);

-- Create Rooms Table
CREATE TABLE Rooms (
    RoomID INT PRIMARY KEY,
    RoomName VARCHAR(100),
    RoomDescription VARCHAR(255),
    ProjectID INT,
    FOREIGN KEY (ProjectID) REFERENCES Projects (ProjectID)
);

-- Create Items Table
CREATE TABLE Items (
    ItemID INT PRIMARY KEY,
    ItemName VARCHAR(100),
    ItemDescription VARCHAR(255),
    RoomID INT,
    FOREIGN KEY (RoomID) REFERENCES Rooms (RoomID)
);

-- Create Suppliers Table
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY,
    SupplierName VARCHAR(100),
    ContactInfo VARCHAR(255)
);

-- Create Materials Table
CREATE TABLE Materials (
    MaterialID INT PRIMARY KEY,
    MaterialName VARCHAR(100),
    Description VARCHAR(255)
);

-- Create MaterialSuppliers Table (Many-to-Many Relationship)
CREATE TABLE MaterialSuppliers (
    MaterialSupplierID INT PRIMARY KEY,
    MaterialID INT,
    SupplierID INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (MaterialID) REFERENCES Materials (MaterialID),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID)
);

-- Create Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE,
    ClientID INT,
    FOREIGN KEY (ClientID) REFERENCES Clients (ClientID)
);

-- Create OrderItems Table (Many-to-Many Relationship)
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    ItemID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (ItemID) REFERENCES Items (ItemID)
);

CREATE TABLE Desk(
	DeskId INT PRIMARY KEY,
	LengthInCm INT,
	Name VARCHAR(50)
)

CREATE TABLE Boss(
	BossId INT PRIMARY KEY,
	Surname VARCHAR(50),
	Age INT,
	SecretaryID INT,
	FOREIGN KEY (SecretaryId) REFERENCES Secretaries(SecretaryID)
) 

CREATE TABLE PrimeMatter(
	PrimeMatterId INT PRIMARY KEY,
	NameOfTheMatter VARCHAR(50),
	PricePerKilo INT
)

CREATE TABLE Factory(
	FactoryId INT PRIMARY KEY,
	FactoryName VARCHAR(50)
)

CREATE TABLE CreatedProduct(
	ObjectId INT,
	PrimeMatterId INT,
	FactoryId INT,
	NameOfProduct VARCHAR(50),
	PRIMARY KEY (ObjectId, PrimeMatterId, FactoryId),
	FOREIGN KEY (PrimeMatterId) References PrimeMatter (PrimeMatterId),
	FOREIGN KEY (FactoryId) References Factory (FactoryId)
)
	

-- Add a MaterialID column to the Items Table
ALTER TABLE Items
ADD MaterialID INT,
FOREIGN KEY (MaterialID) REFERENCES Materials(MaterialID);
