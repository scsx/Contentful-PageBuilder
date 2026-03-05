import type { TTimeline } from '@/types/contentful-models'

interface TimelineProps {
  readonly data: TTimeline
}

export function Timeline({ data }: TimelineProps) {
  const fields = data.fields as Record<string, unknown>
  const { title, items, color, direction } = fields

  const timelineTitle = typeof title === 'string' ? title : ''
  const isDarkColor = color === true
  const isVertical = direction !== false // default true

  // Extrair array de items - pode estar aninhado em items.items
  let timelineItems: unknown[] = []
  if (Array.isArray(items)) {
    timelineItems = items
  } else if (items && typeof items === 'object' && 'items' in items) {
    const itemsObj = items as Record<string, unknown>
    if (Array.isArray(itemsObj.items)) {
      timelineItems = itemsObj.items
    }
  }

  if (timelineItems.length === 0) {
    return null
  }

  // Definir cores baseado em isDarkColor
  const lineColor = isDarkColor ? 'bg-blue-900' : 'bg-blue-300'
  const dotColor = isDarkColor ? 'bg-blue-900' : 'bg-blue-300'
  const titleColor = isDarkColor
    ? 'text-blue-900 dark:text-blue-300'
    : 'text-blue-300 dark:text-blue-200'

  // TIMELINE VERTICAL
  if (isVertical) {
    return (
      <div className='w-full py-8'>
        {timelineTitle && (
          <h2 className='text-2xl font-bold mb-8 text-gray-900 dark:text-white'>{timelineTitle}</h2>
        )}

        <div className='relative'>
          {/* Linha vertical */}
          <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${lineColor}`} />

          {/* Eventos */}
          <div className='space-y-8 ml-4'>
            {timelineItems.map((item, index) => {
              const itemData = item as Record<string, unknown>
              const itemTitle = String(itemData.title || '')
              const itemText = String(itemData.text || '')

              return (
                <div key={`${itemTitle}-${index}`} className='relative'>
                  {/* Bolinha */}
                  <div
                    className={`absolute -left-[21px] top-0 w-3 h-3 rounded-full ${dotColor} z-10`}
                  />

                  {/* Conteúdo */}
                  <div>
                    <h2 className={`font-semibold -mt-2 ${titleColor}`}>{itemTitle}</h2>
                    <p className='text-sm text-gray-800 dark:text-gray-400 mt-1'>{itemText}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // TIMELINE HORIZONTAL
  return (
    <div className='w-full py-8 px-0'>
      {timelineTitle && (
        <h2 className='text-2xl font-bold mb-8 text-gray-900 dark:text-white px-6'>
          {timelineTitle}
        </h2>
      )}

      <div className='relative pt-16'>
        {/* Linha horizontal */}
        <div className={`absolute left-0 right-0 top-8 h-0.5 ${lineColor}`} />

        {/* Eventos */}
        <div className='flex justify-between w-full gap-4 pb-4'>
          {timelineItems.map((item, index) => {
            const itemData = item as Record<string, unknown>
            const itemTitle = String(itemData.title || '')
            const itemText = String(itemData.text || '')

            return (
              <div key={`${itemTitle}-${index}`} className='relative flex-1'>
                {/* Bolinha */}
                <div className={`-mt-[37px] mb-4 w-3 h-3 rounded-full ${dotColor} z-10`} />

                {/* Conteúdo */}
                <div>
                  <h2 className={`font-semibold ${titleColor}`}>{itemTitle}</h2>
                  <p className='text-sm text-gray-800 dark:text-gray-400 mt-1'>{itemText}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
