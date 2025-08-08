DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT
);

INSERT INTO movies (title, description) values ('Iron Man', 'Iron Man (Iron Man: El Hombre de Hierro en América Hispana) es una película de superhéroes de 2008, que marca la primera entrega del Universo Cinematográfico de Marvel.');

SELECT * FROM movies
