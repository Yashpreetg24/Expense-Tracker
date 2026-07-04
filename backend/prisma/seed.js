const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  const categories = [
    { name: 'Food' },
    { name: 'Travel' },
    { name: 'Shopping' },
    { name: 'Bills' },
    { name: 'Entertainment' },
    { name: 'Health' },
    { name: 'Education' },
    { name: 'Other' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  const paymentMethods = [
    { name: 'Cash' },
    { name: 'UPI' },
    { name: 'Credit Card' },
    { name: 'Debit Card' },
    { name: 'Bank Transfer' },
  ];

  for (const method of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { name: method.name },
      update: {},
      create: method,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
