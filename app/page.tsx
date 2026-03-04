import { contentfulClient } from '@/lib/contentful'
export default async function Home() {
  const entries = await contentfulClient.getEntries()

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      <main className='max-w-6xl mx-auto px-6 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-black dark:text-white'>
          Contentful Page Builder
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Total entries: {entries.items.length}
        </p>
      </main>
    </div>
  )
}
