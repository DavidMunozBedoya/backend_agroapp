import mysql from 'mysql2/promise';

async function checkTable() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'agroapp'
  });

  try {
    const [rows] = await connection.query('DESCRIBE supplies');
    console.log('Estructura de la tabla supplies:');
    console.table(rows);
    
    // También mostrar la consulta SHOW CREATE TABLE
    const [createTable] = await connection.query('SHOW CREATE TABLE supplies');
    console.log('\n\nSentencia CREATE TABLE:');
    console.log(createTable[0]['Create Table']);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkTable();
