const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true }
    });
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

const getPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany({
      select: { id: true, name: true }
    });
    res.status(200).json({ paymentMethods });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getPaymentMethods
};
