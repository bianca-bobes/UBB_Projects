exec addToTables 'Designers'

create or alter view getIDSpeci as
	select Specialization, count(*) as number_of_IDSpeci
	from Designers
	group by Specialization
go

exec addToViews 'getIDSpeci'
exec addToTests 'test1'
exec connectTableToTest 'Designers', 'test1', 1000, 1
exec connectViewToTest 'getIDSpeci', 'test1'

create or alter procedure populateTableDesigners(@rows int) as
	while @rows > 0 begin
		insert into Designers(