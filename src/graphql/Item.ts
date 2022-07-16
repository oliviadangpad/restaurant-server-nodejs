import { extendType, objectType } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('name')
    t.nonNull.string('image_url')
    t.nonNull.int('category_id')
  },
})

const items: NexusGenObjects['Item'][] = [
  {
    id: 1,
    name: 'howto',
    category_id: 1,
    image_url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 2,
    name: 'graphql',
    category_id: 2,
    image_url: 'graphql.org',
    description: 'GraphQL official website',
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
