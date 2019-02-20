DROP TABLE nibs_orders;

CREATE TABLE nibs_orders(
  orderid VARCHAR (20) PRIMARY KEY,
  customer VARCHAR (20),
  price INTEGER,
  orderdate DATE,
  product VARCHAR (20),
  offer VARCHAR (20)
);


INSERT INTO nibs_orders (orderid, customer, price, product, offer) VALUES ('ORD_0001', '123456', 100, 'EcoTruffies', '10% of EcoTruffies');
