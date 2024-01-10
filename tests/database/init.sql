CREATE TABLE IF NOT EXISTS 'users' (
    'id' int(11) NOT NULL,
    'name' varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS 'animals' (
    'id' int(11) NOT NULL,
    'name' varchar(255) NOT NULL,
    'weight' int(11) NOT NULL
);

INSERT INTO 'users' ('id', 'name') VALUES (1, 'John Doe');

INSERT INTO 'animals' ('id', 'name', 'weight') VALUES (1, 'Cat', 5);
INSERT INTO 'animals' ('id', 'name', 'weight') VALUES (2, 'Dog', 10);
INSERT INTO 'animals' ('id', 'name', 'weight') VALUES (3, 'Horse', 100);