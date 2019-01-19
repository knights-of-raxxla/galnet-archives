# Galnet Archives

## Usage

```
> node scripts/search.js Dark Wheel

2 results for "Dark Wheel":
==========================================
Prism Senator Missing
Tue Jul 21 2015 00:00:00 GMT+0000 (UTC)
link: https://community.elitedangerous.com/galnet/uid/55ae28209657ba461e357514
==========================================
Galactic News: Kahina Loren Implicated in Patreus Assassination Attempt
Mon Sep 19 2016 00:00:00 GMT+0000 (UTC)
link: https://community.elitedangerous.com/galnet/uid/57dbc92d9657ba651c6732a6
```


## Installation

create an file called env.js in root directory such as,
changes to this configuration need to be done in ./deploy/docker-compose.yml.
```javascript
module.exports = {
    mysql: {
        host: '172.122.0.104',
        user: 'root',
        password: 'poiuyt42',
        database: 'galnet_archives'
    }
};
```
Fire up docker-compose
```bash
cd deploy
docker-compose up -d
cd ../
docker ps
#grab the id of the expressjs container
docker exec -it {container id} bash
# inside docker container :
cd /var/www/galnet-archives
npm install
npm install -g knex
knex migrate:latest
node scripts/seed.js
```

seed.js can be replayed and will fetch new galnet articles daily, ideally it is ran through a cron job.
