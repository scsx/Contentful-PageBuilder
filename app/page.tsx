import { contentfulClient } from '@/lib/contentful'
export default async function Home() {
  const entries = await contentfulClient.getEntries()

  return (
    <div className='min-h-screen bg-white'>
      <main className='container py-12'>
        <h1 className='text-4xl font-bold mb-8 text-black'>Contentful Page Builder</h1>
        <p className='text-lg text-gray-600'>Total entries: {entries.items.length}</p>
      </main>
    </div>
  )
}
