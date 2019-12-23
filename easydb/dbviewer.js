const EasyDB = require('easydb-io/bundle.js')({
  database: '',
  token: ''
})

const db = EasyDB;

// Use a callback
// db.put('myKey', {some: 'data'}, err => console.info(err))
// db.get('myKey', (err, value) => console.info(value, err))
// db.delete('myKey', err => console.info(err))
// db.list((err, value) => console.info(value, err))

// Or, async/await
(async () => {
  let value, values
  // value = await db.put('myKey', {some: 'data'}) 
  // value = await db.get('myKey')
  // value = await db.delete('myKey')
  values = await db.list()
  console.info(values);
})()