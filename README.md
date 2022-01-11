# API - Oblog

A small API furnishing datas for a blog

## Technical stack 

To clone and run this application, you will the followng programms installed on your computer: 

- [Git](https://git-scm.com) 
- [NodeJS](https://nodejs.org/en/download/) (v12 or higher)
- [npm](http://npmjs.com)
- [postgreSQL](https://www.postgresql.org/download/) (v12 or higher)
- [Sqitch](https://sqitch.org/download/) (v1 or higher)

## How To Use

configure the .envexample to .env file, and the sqitch.conf.example to sqitch.conf file

 From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Clachp/API-oblog.git

# Go into the repository
$ cd API-oblog

# Install dependencies
$ npm install

# Create a postgreSQL database and deploy with sqitch 
$ createdb oblog
$ sqitch deploy

# Database eeding 
$ psql -d oblog -f ./data/import.json


# Run the app
$ npm start
```

## HEROKU links

Testing architecture : 
https://api-oblog-claire.herokuapp.com/v1/

Getting categories : 
https://api-oblog-claire.herokuapp.com/v1/categories

Getting all posts (blog's articles):
https://api-oblog-claire.herokuapp.com/v1/posts