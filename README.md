# Quiz project

## Get started

To run the project, you should have node.js and npm to be installed and perform next actions in the project folder:

- `npm install`
- `node index.js`

After this the APP will start listen 3000 port on your local machine

## Features

- GET - `/orders` get all orders
- GET - `/orders?companyName=<company_name>` - get all orders with specific companyName
- GET - `/orders?customerAddress=<customer_address` - get all orders with specific customer address
- DELETE - `/orders/<order_id>` - delete specific order
- GET - `/orders/relevance?sort=(desc|asc)` - get data of how often each item has been ordered, in descending or ascending order
