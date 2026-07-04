const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // Use queryRaw to perform a GROUP BY month.
    // For SQLite, we use strftime. If migrated to Postgres later, this query would use to_char().
    // We'll fetch all non-deleted expenses for the user and group them by month in memory 
    // to ensure cross-database compatibility (SQLite in dev, Postgres in prod).
    
    const expenses = await prisma.expense.findMany({
      where: { userId, isDeleted: false },
      select: { amount: true, expenseDate: true }
    });

    const monthlyData = {};
    for (const exp of expenses) {
      // Get YYYY-MM
      const date = new Date(exp.expenseDate);
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthStr]) {
        monthlyData[monthStr] = 0;
      }
      monthlyData[monthStr] += exp.amount;
    }

    // Format for response
    const summary = Object.keys(monthlyData).map(month => ({
      month,
      total: monthlyData[month]
    })).sort((a, b) => b.month.localeCompare(a.month));

    res.status(200).json({
      message: 'Monthly summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    console.error('Monthly summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategorySpend = async (req, res) => {
  try {
    const userId = req.user.id;

    // DBMS Query requirement: JOIN + GROUP BY + SUM
    // We execute raw SQL to fulfill the DBMS requirement directly in the code.
    
    // Note: If using Postgres in prod, double quotes might be needed around table/column names 
    // if case sensitivity is enforced by Prisma.
    const categorySpend = await prisma.$queryRaw`
      SELECT c.name as category, SUM(e.amount) as total 
      FROM "Expense" e 
      JOIN "Category" c ON e."categoryId" = c.id 
      WHERE e."userId" = ${userId} AND e."isDeleted" = 0
      GROUP BY c.id, c.name
    `;

    // Convert total from BigInt or Number depending on DB driver
    const formattedData = categorySpend.map(item => ({
      category: item.category,
      total: Number(item.total)
    }));

    res.status(200).json({
      message: 'Category spend retrieved successfully',
      data: formattedData
    });
  } catch (error) {
    console.error('Category spend error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getMonthlySummary,
  getCategorySpend
};
