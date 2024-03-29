# SQLiteDB - Module for Node-Red #

## Description ##

Sends SQL queries to an SQLite cloud database provided
as a service at <a href="https://www.sqlitedb.com/" target="_blank">https://www.sqlitedb.com/</a>

## Requirements ##

To use this node first register for an account at <a href="https://www.sqlitedb.com/" target="_blank">https://www.sqlitedb.com/</a>
and create a database. Get the provided API URL and API KEY and add to this
node configurations to be able to access the cloud database.
   
## Extra Benefits ##

An online admin panel is provided with each cloud database. 
It allows to fully manage the database via a web browser and allows
the following actions to be completed conveniently via a graphical
user interface:
        
<br />
<b>TABLES</b>

- alter tables<br />
- create tables<br />
- drop tables<br />
- export tables<br />
- truncate tables<br />

<br />

<b>RECORDS</b><br />
- delete records<br />   
- insert records<br />
- select/read records<br />
- update records<br />
- view/search records<br />

## How to Use ##

The node provides two methods for providing the SQL code for the query:
<br />

- <i>fixed</i> - convenient for permanent SQL statements. The SQL is entered directly in the node configurator.
<br />

- <i>msg.topic</i> - for dynamic statements. The SQL is composed via a functions node and appended to the message's topic attribute before sent onwards.


Using any SQL query, the result is returned in <code>msg.payload</code>.
After submitting the query a response message in the payload will be
returned in the following format:
<br />

- Successful response<br />
<code>{"status":"success","message":"Message text","data":[]}</code>
<br />

- Error response<br />
<code>{"status":"error","message":"Message text"}</code>
<br />

Checking the "status" attribute allows to find out if the SQL query
was executed successfully.
<br />

Checking the "message" attribute allows to find out more information about the query's result.
<br />

The "data" attribute contains the records returned by SELECT type queries.
