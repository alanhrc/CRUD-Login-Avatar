import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    return console.log('Connection database sucess');
  })
  .catch(err => {
    return console.log('Connection database error', err);
  });
