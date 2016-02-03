// Setup MongoDB handle to database
dbHandle = db.getSiblingDB("<DB>");

// Try to Get Connection Account
connUser = dbHandle.getUser("<CONNECTACCOUNT>");

// If Connection Account DNE, create it
if (connUser == null) {
	dbHandle.createUser(
			{
				user: "<CONNECTACCOUNT>",
				pwd: "<PWD>",
				roles: [
					{role: "readWrite", db: "<DB>"}
				]
			}
	);
}

// Try to Get Admin Account
adminUser = dbHandle.getUser("<ADMINUSER>");

// If Admin Account DNE, create it
if (adminUser == null) {
	dbHandle.createUser(
			{
				user: "<ADMINUSER>",
				pwd: "<PWD>",
				roles: [
					{role: "dbAdmin", db: "<DB>"},
					{role: "userAdmin", db: "<DB>"},
					{role: "readWrite", db: "<DB>"}
				]
			}
	);
}
