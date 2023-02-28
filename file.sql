CREATE TABLE users(
	"id" SERIAL PRIMARY KEY,
	"fullName" TEXT NOT NULL CHECK ("fullName" <> ''),
	"email" TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
	"hashPwd" VARCHAR(255) NOT NULL CHECK ("hashPwd" <> ''),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions(
	"id" SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES "users"("id"),
	"token" TEXT UNIQUE NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

SELECT * FROM sessions;