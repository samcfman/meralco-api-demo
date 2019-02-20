DROP TABLE billing_events;

CREATE TABLE billing_events(
  eventid SERIAL PRIMARY KEY,
  eventtype VARCHAR (20),
  customerid VARCHAR (20),
  sin_no VARCHAR (20),
  eventdate timestamp,
  message VARCHAR (50)
);
