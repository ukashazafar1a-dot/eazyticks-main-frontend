import { permanentRedirect } from 'next/navigation'
import React from 'react'

const page = () => {
  permanentRedirect("/account/signin");
}

export default page