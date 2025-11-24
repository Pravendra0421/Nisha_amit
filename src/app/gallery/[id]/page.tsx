import React from 'react'
import AlbumDetailCollection from '../(component)/AlbumDetailCollection'
const page = async({ params }: { params:Promise<{ id: string }> }) => {
    const {id} = await params;
  return (
    <div>
        <AlbumDetailCollection id={id}/>
    </div>
  )
}

export default page