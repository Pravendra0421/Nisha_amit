import React from 'react'
import { ParallaxScrollDemo } from '@/components/common/Gallery';
import AlbumCollection from './(component)/AlbumCollection';
export const dynamic = 'force-dynamic';
const page = () => {
  return (
    <div>
        {/* <ParallaxScrollDemo/> */}
        <AlbumCollection/>
    </div>
  )
}

export default page;