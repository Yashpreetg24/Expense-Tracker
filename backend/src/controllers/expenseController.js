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
    const { 
      categoryId, paymentMethodId, startDate, endDate, minAmount, maxAmount,
      search, sortBy, sortOrder, page, limit
    } = req.query;

    const where = {
      userId,
      isDeleted: false
    };

    if (categoryId) where.categoryId = parseInt(categoryId);
    if (paymentMethodId) where.paymentMethodId = parseInt(paymentMethodId);
    
    if (startDate || endDate) {
      where.expenseDate = {};
      if (startDate) where.expenseDate.gte = new Date(startDate);
      if (endDate) where.expenseDate.lte = new Date(endDate);
    }

    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount.gte = parseFloat(minAmount);
      if (maxAmount) where.amount.lte = parseFloat(maxAmount);
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { note: { contains: search } }
      ];
    }

    // Sorting
    const orderBy = {};
    const validSortFields = { date: 'expenseDate', amount: 'amount' };
    const sortField = validSortFields[sortBy] || 'expenseDate';
    const sortDir = sortOrder === 'asc' ? 'asc' : 'desc';
    orderBy[sortField] = sortDir;

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const [total, expenses] = await Promise.all([
      prisma.expense.count({ where }),
      prisma.expense.findMany({
        where,
        include: {
          category: true,
          paymentMethod: true
        },
        orderBy,
        skip,
        take: limitNum
      })
    ]);

    res.status(200).json({
      message: 'Expenses retrieved successfully',
      expenses,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Internal server error while retrieving expenses' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const expense = await prisma.expense.findFirst({
      where: {
        id: parseInt(id),
        userId,
        isDeleted: false
      },
      include: {
        category: true,
        paymentMethod: true
      }
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json({
      message: 'Expense retrieved successfully',
      expense
    });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ error: 'Internal server error while retrieving expense' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Verify ownership and existence
    const existingExpense = await prisma.expense.findFirst({
      where: { id: parseInt(id), userId, isDeleted: false }
    });

    if (!existingExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const expense = await prisma.expense.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: { category: true, paymentMethod: true }
    });

    res.status(200).json({
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ error: 'Internal server error while updating expense' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingExpense = await prisma.expense.findFirst({
      where: { id: parseInt(id), userId, isDeleted: false }
    });

    if (!existingExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true }
    });

    res.status(200).json({
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ error: 'Internal server error while deleting expense' });
  }
};

const restoreExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingExpense = await prisma.expense.findFirst({
      where: { id: parseInt(id), userId, isDeleted: true }
    });

    if (!existingExpense) {
      return res.status(404).json({ error: 'Deleted expense not found' });
    }

    await prisma.expense.update({
      where: { id: parseInt(id) },
      data: { isDeleted: false }
    });

    res.status(200).json({
      message: 'Expense restored successfully'
    });
  } catch (error) {
    console.error('Restore expense error:', error);
    res.status(500).json({ error: 'Internal server error while restoring expense' });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  restoreExpense
};
