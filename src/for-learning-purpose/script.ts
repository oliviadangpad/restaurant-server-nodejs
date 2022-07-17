/**
 * This file is only to run pre-database connection
 * TO-DO: remove this file later
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define an async function called main to send queries to the database.
// You will write all your queries inside this function. You are calling the findMany() query, which will return all the items records that exist in the database.
async function main(): Promise<void> {
  const newItem = await prisma.items.create({
    data: {
      name: 'script',
      description: 'created from script',
      image_url: 'some.com',
      category_id: 2,
      price_in_cents: 20,
    },
  })
  console.log(`Created item: ${newItem}`)

  const allItems = await prisma.items.findMany()
  console.log(`allItems in database: ${allItems}`)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })