CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    contactEmail TEXT NOT NULL,
    contactPhone TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
    id TEXT PRIMARY KEY,
    schoolId TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    role TEXT CHECK(role IN ('teacher', 'admin', 'principal')) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schoolId) REFERENCES schools(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS enrollments (
    id TEXT PRIMARY KEY,
    schoolId TEXT NOT NULL,
    studentFirstName TEXT NOT NULL,
    studentLastName TEXT NOT NULL,
    enrollmentDate DATETIME NOT NULL,
    gradeLevel TEXT NOT NULL,
    status TEXT CHECK(status IN ('active', 'inactive', 'graduated')) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (schoolId) REFERENCES schools(id) ON DELETE CASCADE
);
