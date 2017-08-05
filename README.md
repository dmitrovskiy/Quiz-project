# Quiz project

## Get started

To run the project, you should have `node.js` and `npm` and `mongo` to be installed.    
Perform next actions in the project folder:   

- `npm install`
- `npm run build`
- `NODE_LOG=on npm start`

After this the APP will listen 3000 port on your local machine. I.e http://localhost:3000

## Routes

- GET - `/orders` get all orders
- GET - `/orders?companyName={company_name}` - get all orders with specific companyName
- GET - `/orders?customerAddress={customer_address}` - get all orders with specific customer address
- GET - `/orders/{orderId}` - get specific order by id
- POST - `/orders` - create an order
- PUT - `/orders/{orderId}` - update an order
- PATCH - `/orders/{orderId}` - partial order update
- DELETE - `/orders/<order_id>` - delete specific order
- GET - `/stats/orders/relevance?sort={desc|asc}` - get data of how often each item has been ordered, in descending or ascending order

## Tests

To run tests, perform this action in the project folder:

- `npm run test`

## Run project with Docker

To run the project with Docker, you should have `docker` and `docker-compose` to be installed.   
Then, execute the following command in the project folder:

- `ENV=local BUILD=1 ./deploy`

It will spin up mongo and api docker containers on your local machine.    
API will be available by http://localhost:3000
Also, there will be available swagger API documentation by http://localhost:3030

## Run tests with Docker

To run tests with Docker, run the following command in the project folder:

- `ENV=test BUILD=1 ./deploy`
