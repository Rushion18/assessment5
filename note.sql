CREATE TABLE Notes
(
    ID INIT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR (100) NOT NULL,
    Content NVARCHAR (MAX) NOT NULL, 
    CreatedAt DATETIME NOT NULL
)
