const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  console.log(db('users').select('id', 'username'));
  return db('users').select('id', 'username');
}

function findBy(filter) {
  console.log(db('users').where({username: filter}));
  return db('users').where({username: filter});
}

async function add(user) {
  console.log(user);
  try{
  const [id] = await db('users').insert(user);
  

  return findById(id);
  } catch(err){
    console.log(err);
  }
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}