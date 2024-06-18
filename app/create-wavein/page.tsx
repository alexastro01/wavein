import React from 'react'
import { generateRequestParameters } from '@/utils/generateRequestParamaters'
import { InputWaveInDetails } from '@/components/InputWaveInDetails'
import { Navbar } from '@/components/Navbar'
const CreateWaveIn = () => {

    // payeeIdentity,
    // payerIdentity,
    // expectedAmount,
    // tokenAddress,
    // dueDate,
    // reason

  return (
    <div>
        <Navbar />
        <div className='flex justify-center items-center mt-8'>
          <InputWaveInDetails />
          </div>
    </div>
  )
}

export default CreateWaveIn