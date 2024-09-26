import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { sampleGames, gameLogs, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedSampleGames() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS sampleGames (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      genre VARCHAR(255) NOT NULL
    );
  `;

  const insertedSampleGames = await Promise.all(
    sampleGames.map(
      (sampleGames) => client.sql`
        INSERT INTO sampleGames (game_id, title, genre)
        VALUES (${sampleGames.id}, ${sampleGames.title}, ${sampleGames.genre}})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSampleGames;
}

async function seedGameLogs() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS game_logs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL,
      games VARCHAR(255) NOT NULL,
      year DATE NOT NULL,
      status VARCHAR(255) NOT NULL,
      games_completed INT NOT NULL,
      games_dropped INT NOT NULL,
      log_started DATE NOT NULL
    );
  `;

  const insertedGameLogs = await Promise.all(
    gameLogs.map(
      (game_logs) => client.sql`
        INSERT INTO game_logs (id, user_id, games, year, status, games_completed, games_dropped, log_started)
        VALUES (${game_logs.id}, ${game_logs.user_id}, ${game_logs.games}, ${game_logs.year}, ${game_logs.status}, ${game_logs.games_completed}, ${game_logs.games_dropped}, ${game_logs.log_started})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedGameLogs;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedSampleGames();
    await seedGameLogs();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}