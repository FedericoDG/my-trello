interface SeedEntries {
  tasks: SeedTask[]
}

interface SeedTask {
  description: string
  createdAt: number
  status: string
}

const seedData: SeedEntries = {
  tasks: [
    {
      description: 'Learn about React.js',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      description: 'Learn about Next.js',
      createdAt: Date.now(),
      status: 'in-progress',
    },
    {
      description: 'Learn about MongoDB',
      createdAt: Date.now(),
      status: 'finished',
    },
  ],
}

export default seedData
