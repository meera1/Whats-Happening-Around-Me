# What's Happening Around Me - WHAM
What’s happening around me is application to get information or recommendations about events, happenings or permanent businesses on an interactive map interface.

## Using the Web Application
The web application can be accessed at [WHAM](http://wham2-jarvis5.rhcloud.com)

## Setting up the development environment

1. Install NodeJS
Download ditribution [NodeJS](https://nodejs.org) for your operating system.

2. Install MongoDB
Download and install [MongoDB](https://www.mongodb.org/)

3. Code Repository
[Github](https://github.ccs.neu.edu/sahibj/cs5500-f15-j.a.r.v.i.s.)
Download the source code using following command
> git clone https://github.ccs.neu.edu/sahibj/cs5500-f15-j.a.r.v.i.s..git

4. Download dependencies
> npm install

5. Start MongoDB Server 
> %MONGO_HOME%/Server/3.0/bin/mongod.exe

6. Start web server
> node server.js

7. Access the web site locally using the URL http://localhost:3000/

## Executing the tests
> karma start karma.conf.js