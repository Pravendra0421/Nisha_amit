import React from 'react'
import Events from '@/components/common/Event'
import WeddingEvents from '@/components/common/weddingEvent'
const page = () => {
  return (
    <>
    <div className='mt-25'>
      <Events/>
    <WeddingEvents/>
    </div>
    </>
  )
}
export default page;