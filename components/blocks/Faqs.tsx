import type { TFaqs } from '@/types/contentful-models'

interface FaqsProps {
  readonly data: TFaqs
}

export function Faqs({ data }: FaqsProps) {
  const { name, items } = data.fields

  return (
    <div className='w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-6 text-black dark:text-white'>{name}</h2>
      <div className='space-y-4'>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={`${item.sys.id}-${index}`}
              className='border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800'>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>FAQ Item ID: {item.sys.id}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-500 dark:text-gray-400'>Sem items</p>
        )}
      </div>
    </div>
  )
}
