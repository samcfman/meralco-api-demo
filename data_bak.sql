DROP TABLE salesforce.balanceupdate;
DROP TABLE salesforce.dailybalanceupdate;

CREATE TABLE salesforce.balanceupdate(
  customer_id VARCHAR (20) PRIMARY KEY,
  sin VARCHAR (20),
  remaining_balance DECIMAL,
  consumed_balance DECIMAL,
  reading_datetime timestamp
);


CREATE TABLE salesforce.dailybalanceupdate(
  customer_id VARCHAR (20) PRIMARY KEY,
  sin VARCHAR (20),
  message VARCHAR(500)
);
