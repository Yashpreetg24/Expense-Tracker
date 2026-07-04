const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const baseWhere = {
      userId,
      isDeleted: false
    };

    // 1. Total transactions and total amount
    const totalAggregations = await prisma.expense.aggregate({
      where: baseWhere,
      _sum: { amount: true },
      _count: { id: true },
      _max: { amount: true },
      _min: { amount: true }
    });

    // 2. This month expenses
    const thisMonthAggregations = await prisma.expense.aggregate({
      where: {
        ...baseWhere,
        expenseDate: { gte: startOfMonth }
      },
      _sum: { amount: true }
    });

    res.status(200).json({
      message: 'Dashboard summary retrieved successfully',
      data: {
        totalExpenses: totalAggregations._sum.amount || 0,
        thisMonthExpenses: thisMonthAggregations._sum.amount || 0,
        totalTransactions: totalAggregations._count.id || 0,
        highestExpense: totalAggregations._max.amount || 0,
        lowestExpense: totalAggregations._min.amount || 0
      }
    });
  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({ error: 'Internal server error while retrieving dashboard summary' });
  }
};

module.exports = {
  getDashboardSummary
};
