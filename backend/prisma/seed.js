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
  
  const bcrypt = require('bcrypt');
  
  // Seed User
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('password123', saltRounds);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    }
  });

  // Get categories and payment methods to use their IDs
  const dbCategories = await prisma.category.findMany();
  const dbPaymentMethods = await prisma.paymentMethod.findMany();

  const getCatId = (name) => dbCategories.find(c => c.name === name).id;
  const getPmId = (name) => dbPaymentMethods.find(p => p.name === name).id;

  // 25 Realistic Expenses
  const expenses = [
    { title: 'Swiggy order - Dinner', amount: 450, note: 'Biryani from Behrouz', expenseDate: new Date('2026-06-01T19:00:00Z'), categoryId: getCatId('Food'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Ola ride to office', amount: 250, note: 'Morning commute', expenseDate: new Date('2026-06-02T08:30:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Electricity bill', amount: 1200, note: 'May bill', expenseDate: new Date('2026-06-03T10:00:00Z'), categoryId: getCatId('Bills'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Amazon Shopping - Headphones', amount: 2999, note: 'Sony headphones', expenseDate: new Date('2026-06-05T14:20:00Z'), categoryId: getCatId('Shopping'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Netflix Subscription', amount: 649, note: 'Monthly plan', expenseDate: new Date('2026-06-06T09:00:00Z'), categoryId: getCatId('Entertainment'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Pharmacy - Medicines', amount: 540, note: 'Cold and flu meds', expenseDate: new Date('2026-06-08T18:10:00Z'), categoryId: getCatId('Health'), paymentMethodId: getPmId('Cash'), userId: user.id },
    { title: 'Udemy Course', amount: 499, note: 'React Native course', expenseDate: new Date('2026-06-10T21:00:00Z'), categoryId: getCatId('Education'), paymentMethodId: getPmId('Debit Card'), userId: user.id },
    { title: 'Starbucks Coffee', amount: 350, note: 'Meeting with client', expenseDate: new Date('2026-06-12T16:45:00Z'), categoryId: getCatId('Food'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Grocery - D-Mart', amount: 4500, note: 'Monthly groceries', expenseDate: new Date('2026-06-15T11:30:00Z'), categoryId: getCatId('Food'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Uber to Airport', amount: 850, note: 'Flight to Delhi', expenseDate: new Date('2026-06-18T05:00:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Flight Tickets', amount: 5600, note: 'Delhi round trip', expenseDate: new Date('2026-06-18T06:00:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Hotel Stay', amount: 4200, note: '2 nights in Delhi', expenseDate: new Date('2026-06-18T14:00:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Dinner at Taj', amount: 3200, note: 'Team dinner', expenseDate: new Date('2026-06-19T20:30:00Z'), categoryId: getCatId('Food'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Mobile Recharge', amount: 299, note: 'Jio 1 month', expenseDate: new Date('2026-06-21T10:15:00Z'), categoryId: getCatId('Bills'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Movie Tickets', amount: 750, note: 'PVR IMAX', expenseDate: new Date('2026-06-22T18:00:00Z'), categoryId: getCatId('Entertainment'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Gym Membership', amount: 1500, note: 'Monthly fee', expenseDate: new Date('2026-06-23T07:00:00Z'), categoryId: getCatId('Health'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Books from Crossword', amount: 1250, note: 'Self-help books', expenseDate: new Date('2026-06-25T15:30:00Z'), categoryId: getCatId('Education'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Zomato - Lunch', amount: 320, note: 'Pizza', expenseDate: new Date('2026-06-26T13:45:00Z'), categoryId: getCatId('Food'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Zara Clothing', amount: 5500, note: 'Shirts and jeans', expenseDate: new Date('2026-06-28T17:00:00Z'), categoryId: getCatId('Shopping'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Broadband Bill', amount: 999, note: 'Airtel Xstream', expenseDate: new Date('2026-06-29T09:00:00Z'), categoryId: getCatId('Bills'), paymentMethodId: getPmId('Credit Card'), userId: user.id },
    { title: 'Spotify Premium', amount: 119, note: 'Monthly sub', expenseDate: new Date('2026-06-30T10:00:00Z'), categoryId: getCatId('Entertainment'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Dental Checkup', amount: 800, note: 'Routine cleaning', expenseDate: new Date('2026-07-01T11:00:00Z'), categoryId: getCatId('Health'), paymentMethodId: getPmId('Cash'), userId: user.id },
    { title: 'Metro Pass Recharge', amount: 500, note: 'Delhi Metro', expenseDate: new Date('2026-07-02T08:30:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('UPI'), userId: user.id },
    { title: 'Stationery', amount: 150, note: 'Pens and notebooks', expenseDate: new Date('2026-07-03T14:20:00Z'), categoryId: getCatId('Other'), paymentMethodId: getPmId('Cash'), userId: user.id },
    { title: 'Weekend Getaway', amount: 8500, note: 'Trip to Agra', expenseDate: new Date('2026-07-04T09:00:00Z'), categoryId: getCatId('Travel'), paymentMethodId: getPmId('Credit Card'), userId: user.id }
  ];

  for (const expense of expenses) {
    await prisma.expense.create({ data: expense });
  }

  console.log('Seeding finished. Inserted 25 expenses for test@example.com');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
