import { seedInitialData } from '../config/db.js';

async function runSeed() {
  console.log('🌱 Seeding CareerFlow sample database...');
  await seedInitialData();
  console.log('✅ Database successfully seeded with demo user and sample applications!');
  process.exit(0);
}

runSeed();
