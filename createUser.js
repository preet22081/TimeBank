const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vp@232930', 
    database: 'timebank',
  });

  const hashedPassword = await bcrypt.hash('123456', 10);
  await connection.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    ['test@example.com', hashedPassword]
  );

  console.log('✅ Test user created');
  process.exit();
})();
