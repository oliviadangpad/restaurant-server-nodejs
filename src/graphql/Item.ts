import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.int('id')
    t.string('description')
    t.nonNull.string('name')
    t.string('imageUrl')
    t.nonNull.int('categoryId')
    t.nonNull.int('priceInCents')
    t.field('postedBy', {
      type: 'User',
      resolve(parent, args, context) {
        return context.prisma.item
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .postedBy()
      },
    })
  },
})

export const ItemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Item',
      resolve(parent, args, context, _info) {
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
            imageUrl,
            categoryId,
            priceInCents,
          },
        })
        return newItem
      },
    })
  },
})
