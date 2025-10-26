import React from 'react'
import { BaratRepository } from '@/core/repositories/IBaratLocationRepository'
import { baratLocationUsecase } from '@/core/usecases/IBaratLocation.usecase'
import Settings from './(component)/settings';
const baratRepo = new BaratRepository();
const baratLocation = new baratLocationUsecase(baratRepo);
const page = async() => {
  const getLocation = await baratLocation.get();
  return (
    <div>
      <Settings data={getLocation}/>
    </div>
  )
}

export default page