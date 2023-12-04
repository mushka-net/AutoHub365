import sqlite3

sqlConnection = sqlite3.connect('db.sqlite3')
cursor = sqlConnection.cursor()
print("Opened database successfully")

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())
