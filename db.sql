DROP TABLE salesforce.dailybalanceupdate;

CREATE TABLE salesforce.dailybalanceupdate(
  id    SERIAL PRIMARY key,
  customer_id VARCHAR (20),
  sin VARCHAR (20),
  message VARCHAR(500)
);

INSERT INTO salesforce.dailybalanceupdate (customer_id, sin, message) VALUES ('3333', '1234', 'Your Balance as of 2019-03-28 07:05 is PHP 1,300');
