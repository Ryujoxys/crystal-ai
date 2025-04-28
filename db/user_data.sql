CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    aspirations TEXT[] NOT NULL,
    birth_year VARCHAR(10) NOT NULL,
    birth_month VARCHAR(10) NOT NULL,
    birth_day VARCHAR(10) NOT NULL,
    birth_hour VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    preference TEXT NOT NULL,
    additional_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);