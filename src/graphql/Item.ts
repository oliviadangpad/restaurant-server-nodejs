import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.int('id')
    t.string('description')
    t.nonNull.string('name')
    t.string('image_url')
    t.nonNull.int('category_id')
    t.nonNull.int('price_in_cents')
  },
})

export const ItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Item',
      resolve(parent, args, context, info) {
        return context.prisma.items.findMany()
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
        const { name, description, imageUrl, categoryId, priceInCents } = args
        const newItem = context.prisma.items.create({
          data: {
            name,
            description,
            image_url: imageUrl,
            category_id: categoryId,
            price_in_cents: priceInCents,
          },
        })
        return newItem
      },
    })
  },
})
