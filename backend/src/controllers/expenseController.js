const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createExpense = async (req, res) => {
  try {
    const { title, amount, note, expenseDate, categoryId, paymentMethodId } = req.body;
    const userId = req.user.id;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        note,
        expenseDate,
        categoryId,
        paymentMethodId,
        userId
      },
      include: {
        category: true,
        paymentMethod: true
      }
    });

    res.status(201).json({
      message: 'Expense created successfully',
      expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Internal server error while creating expense' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
        isDeleted: false
      },
      include: {
        category: true,
        paymentMethod: true
      },
      orderBy: {
        expenseDate: 'desc'
      }
    });

    res.status(200).json({
      message: 'Expenses retrieved successfully',
      expenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Internal server error while retrieving expenses' });
  }
};

module.exports = {
  createExpense,
  getExpenses
};
