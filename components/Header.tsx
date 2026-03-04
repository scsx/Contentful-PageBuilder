'use client'

import { Header as F36Header } from '@contentful/f36-components'

export const PageHeader = () => {
  return (
    <F36Header
      title='Article'
      withBackButton={true}
      backButtonProps={{ onClick: () => console.log('back button click') }}
      breadcrumbs={[
        {
          content: 'Content Types',
          url: '#',
          onClick: () => console.log('Content Types clicked')
        }
      ]}
    />
  )
}
