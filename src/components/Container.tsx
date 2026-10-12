'use client';

import React from 'react'

interface ContianerProps {
  children: any,
}

const Container: React.FC<ContianerProps> = ({children}) => {
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Container