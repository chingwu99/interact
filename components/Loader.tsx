'use client'

import { ClipLoader } from 'react-spinners'

const Loader = () => (
  <div className="h-[70vh] flex flex-col justify-center items-center ">
    <ClipLoader color="#906B7F" size={80} />
  </div>
)

export default Loader
