import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('firstName')
    t.string('lastName')
    t.nonNull.string('email')
    t.nonNull.string('role')
    t.nonNull.list.nonNull.field('items', {
      type: 'Item',
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .items()
      },
    })
  },
})
