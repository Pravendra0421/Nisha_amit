
import Image from 'next/image';
import { BrideMemberItem } from './BrideMember';
const BrideMember = () => {
  return (
    <div className='mb-20'>
        <div className=' text-4xl md:text-5xl lg:text-7xl font-bold p-2 '>Her Support System</div>
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
            {BrideMemberItem.map((item)=>(
                <div key={item.id}>
                    <Image 
                    width={350}
                    height={350}
                    src={item.imageUrl}
                    alt='groomSide'
                    className='rounded-full'
                    />
                    <div className='font-mono text-2xl mt-4'>{item.name}</div>
                    <div className='font-serif text-2xl mt-4'>{item.relation}</div>
                </div>
            ))}
        </div>

    </div>
  )
}

export default BrideMember;