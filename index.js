const express = require('express');
const app = express();
const orders = express.Router();
let data = require('./data');

function filterBy(field, payload) {
	return (order => order[field].toLowerCase() === payload.toLowerCase());
}

orders.get('/', (req, res) => {
	if ('companyName' in req.query) {
		const ordersOfCompany = data.filter(filterBy('companyName', req.query.companyName));
		return res.json(ordersOfCompany);
	} else if ('customerAddress' in req.query) {
		const ordersOfCustomer = data.filter(filterBy('customerAddress', req.query.customerAddress));
		return res.json(ordersOfCustomer);
	}
	return res.json(data);
});

orders.delete('/:id', (req, res) => {
	if ('id' in req.params) {
		data = data.filter(order => order.orderId !== req.params.id);
//		data = data.filter(filterBy('orderId', req.params.id));
		return res.status(200).end();
	}
	res.status(404).end();
});

orders.get('/relevance', (req, res) => {
	const isDescending = 'sort' in req.query
		? req.query.sort.toLowerCase() !== 'desc'
		: true;

	const ordersMap = data.reduce((map, order) => {
		const key = order.orderedItem;
		if (key in map) {
			map[key] += 1;
		} else {
			map[key] = 1;
		}
		return map;
	}, { });

	const sorted = Object
		.keys(ordersMap)
		.map(key => ({ item: key, count: ordersMap[key] }))
		.sort((a, b) => isDescending ? a.count - b.count : b.count - a.count);

	res.json(sorted).end();
});

app.set('port', process.env.PORT || 3000);
app.use('/orders', orders);

app.listen(app.get('port'), () => console.log('Started on', app.get('port')));
