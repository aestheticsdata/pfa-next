const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: [{
    emit: 'event',
    level: 'query',
  }]
});

prisma.$on('query', e => {
  // console.log("Query: " + e.query)
  // console.log("Duration: " + e.duration + "ms")
});

module.exports = prisma;
