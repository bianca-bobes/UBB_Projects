use [test1]

create table clients(
	clientId int primary key,
	clientName varchar(50) unique,
);

create table banks(
	bankId int primary key
);

create table clientsbanks(
	clientId int foreign key references clients(clientId),
	clientName varchar(50) foreign key references clients(clientName),
	bankId int foreign key references banks(bankId),
	primary key(clientId,clientName,bankId)

);

create table bankingService(
	bankServiceId int primary key
);
create table investingService(
	investingServiceId int primary key
);

create table banksbankingService(
	bankId int foreign key references banks(bankId),
	serviceId int foreign key references bankingService(bankServiceId)
	primary key(bankId, serviceId)

);

create table banksinvestingService(
	bankId int foreign key references banks(bankId),
	serviceId int foreign key references investingService(investingServiceId)
	primary key(bankId, serviceId)
);

create table ClientsbankingService(
	clientId int foreign key references clients(clientId),
	serviceId int foreign key references bankingService(bankServiceId)
	primary key(clientId, serviceId)
);

create table ClientsinvestingService(
	clientName varchar(50) foreign key references clients(clientName),
	serviceId int foreign key references investingService(investingServiceId)
	primary key(clientName, serviceId)
);

-- Inserts for clients table
INSERT INTO clients (clientId, clientName) VALUES
(4,'Lory Bit'),
(1, 'John Doe'),
(2, 'Alice Johnson'),
(3, 'Michael Smith');

-- Inserts for banks table
INSERT INTO banks (bankId) VALUES
(1),
(2),
(3);

-- Inserts for clientsbanks table
INSERT INTO clientsbanks (clientId,clientName, bankId) VALUES
(4,'Lory Bit',1),
(1, 'John Doe', 1),
(2,'Alice Johnson', 2),
(3, 'Michael Smith', 3);

-- Inserts for bankingService table
INSERT INTO bankingService (bankServiceId) VALUES
(1),
(2),
(3);

-- Inserts for investingService table
INSERT INTO investingService (investingServiceId) VALUES
(1),
(2),
(3);

-- Inserts for banksbankingService table
INSERT INTO banksbankingService (bankId, serviceId) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Inserts for banksinvestingService table
INSERT INTO banksinvestingService (bankId, serviceId) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Inserts for ClientsbankingService table
INSERT INTO ClientsbankingService (clientId, serviceId) VALUES
(4,1),
(1, 1),
(2, 2),
(3, 3);

-- Inserts for ClientsinvestingService table
INSERT INTO ClientsinvestingService (clientName, serviceId) VALUES
('Lory Bit',1),
('John Doe', 1),
('Alice Johnson', 2),
('Michael Smith', 3);

go

CREATE OR ALTER PROCEDURE addclient(@bankId int, @clientId int) AS
BEGIN
    DECLARE @clientName varchar(50) = (SELECT clientName FROM clients WHERE clientId = @clientId);

    IF NOT EXISTS (SELECT * FROM ClientsbankingService WHERE clientId = @clientId AND serviceId = @bankId)
    BEGIN
        INSERT INTO ClientsbankingService (clientId, serviceId)
        VALUES (@clientId, @bankId);
    END
END
GO

CREATE OR ALTER FUNCTION p4() RETURNS TABLE AS RETURN
(
    SELECT
        c.clientName,
        COUNT(DISTINCT cb.bankId) AS num_banks,
        COUNT(DISTINCT s.serviceId) AS num_services
    FROM
        clients c
    JOIN
        clientsbanks cb ON c.clientId = cb.clientId
    JOIN
        ClientsbankingService s ON cb.clientId = s.clientId AND cb.bankId = s.serviceId
    GROUP BY
        c.clientName
    HAVING
        COUNT(DISTINCT cb.bankId) > 1
)
GO

-- Execute the addclient procedure to add a client to a banking service
EXEC addclient 1, 4; -- Add client Lory Bit to Bank 1

-- Retrieve the result from function p4
SELECT * FROM p4();
