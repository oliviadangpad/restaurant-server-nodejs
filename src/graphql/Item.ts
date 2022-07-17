import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.int('id')
    t.string('description')
    t.nonNull.string('name')
    t.nonNull.string('imageUrl')
    t.nonNull.int('categoryId')
    t.nonNull.int('priceInCents')
  },
})

const items: NexusGenObjects['Item'][] = [
  {
    id: 1,
    name: 'howto',
    categoryId: 1,
    imageUrl: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
    priceInCents: 100,
  },
  {
    id: 2,
    name: 'graphql',
    categoryId: 2,
    imageUrl: 'graphql.org',
    description: 'GraphQL official website',
    priceInCents: 200,
  },
]

export const ItemQuery = extendType({
  // 2
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      // 3
      type: 'Item',
      resolve(parent, args, context, info) {
        // 4
        return items
      },
    })
  },
})

export const ItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Item',
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
        imageUrl: nonNull(stringArg()),
        categoryId: nonNull(intArg()),
        priceInCents: nonNull(intArg()),
      },

      resolve(parent, args, context) {
        const { name, description, imageUrl, categoryId, priceInCents } = args // 4

        const idCount = items.length + 1 // 5
        const item = {
          id: idCount,
          description,
          imageUrl,
          categoryId,
          name,
          priceInCents,
        }
        items.push(item)
        return item
      },
    })
  },
})
