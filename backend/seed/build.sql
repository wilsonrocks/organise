DROP DATABASE IF EXISTS organise;
CREATE DATABASE organise;
\c organise;

CREATE TYPE membership_type AS ENUM ('admin', 'member');

CREATE TABLE activist (
    id SERIAL PRIMARY KEY,
    email TEXT,
    name TEXT,
    last_login TIMESTAMP,
    joined DATE DEFAULT current_date
);

CREATE TABLE campaign (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    logo TEXT
);

CREATE TABLE membership (
    id SERIAL PRIMARY KEY,
    activist_id INT REFERENCES activist(id),
    campaign_id INT REFERENCES campaign(id),
    membership membership_type
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    campaign_id INT REFERENCES campaign(id),
    instructions TEXT,
    due_date DATE
);

CREATE TABLE task_status (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES task(id),
    activist_id INT REFERENCES activist(id),
    completed BOOLEAN
);

CREATE TABLE vote (
    id SERIAL PRIMARY KEY,
    question TEXT,
    closes DATE,
    campaign_id INT REFERENCES campaign(id)
);

CREATE TABLE vote_choice (
    id SERIAL PRIMARY KEY,
    vote_id INT REFERENCES vote(id),
    text TEXT
);

CREATE TABLE vote_cast (
    id SERIAL PRIMARY KEY,
    vote_id INT REFERENCES vote(id),
    vote_choice_id INT REFERENCES vote_choice(id),
    activist_id INT REFERENCES activist(id)
);