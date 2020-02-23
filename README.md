# clock-in-out-backend
Node JS Backend for HiMama challenge

## Prerequisites
Node
npm
Docker
Postman

## Setup Environment

### Install Node Version Manager (NVM)
Follow the instruction inside the following link:
https://github.com/creationix/nvm/blob/master/README.md

### Install Node

    nvm install stable
    
## Initializing the project

To install the dependencies run the following command:
```bash
npm install
```
 
## Running locally
1. Spin up a local Postgres database: `docker-compose up`
(to bring down: `docker-compose down --volume`)

2. Connect to your local database using the info in `docker-compose.yaml` 

3. Create the database schema by running the PostgreSQL statements in `dbDdl.psql` 

4. Run the application by doing `npm start`

5. Import hiMama.postman_collection.json into postman to make API calls to the back end
