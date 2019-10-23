
API Details
ADD DATA TO THE DB (the data key can have any (longer) value object:
curl -i -X POST -H 'Content-Type: application/json' -d '{"macAddress":"12:12", "sessionKey": "1212", "data": {"temp":"76"}}' https://connected-devices-itp.herokuapp.com/add

GET ONES OWN DATA (note: this is a POST request with sensitive data in its body):
curl -i -X POST -H 'Content-Type: application/json' -d '{"macAddress":"12:12", "sessionKey": "1212"}' https://connected-devices-itp/data

DELETE ONES OWN DATA
curl -i -X DELETE -H 'Content-Type: application/json' -d '{"macAddress":"12:12", "sessionKey": "1212", "transactionID": "d4960b1c8e547b08c98cd16631c8c7ae"}' https://connected-devices-itp.herokuapp.com/delete
which returns one of three responses:
- not authorized
- authorized but row (with transactionID) doesn't exist
- success

We are checking for MAC and sessionKey pairs so we would need to get a list of the approved ones beforehand. right now the only ones that work is:

macAddress: 12:12
sessionKey: 1212

macAddress: 13:13
sessionKey: 1313

https and http request both work.

DB Details

The DB contains the below columns - 
    
sessionKey (That has been assigned to them) - VARCHAR

macAddress (of the device) - VARCHAR

timestamp ( this value is calculated in the DB itself)  - DATE

data ( this can be any object that they wish for. We stringify it and store it here) - VARCHAR

transactionID (based on a hash of the time they make the request) - VARCHAR