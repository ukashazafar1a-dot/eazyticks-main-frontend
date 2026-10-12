import React from 'react';
import Terms from '../_components/Terms';
import Banner from '../_components/Banner';



export const metadata = {
title: `Terms & Conditions - Policies - Eazyticks`,
description:`This Terms & Conditions details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
alternates: {
  canonical: '/policies/terms-conditions'
},
openGraph: {
  title: `Terms & Conditions - Policies - Eazyticks`,
  description: `This Terms & Conditions details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
  url: '/policies/terms-conditions',
  siteName: 'Eazyticks',
  images: [
    {
      url: `https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png`,
      width: 600,
      height: 300,
    }
  ],
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: `Terms & Conditions - Policies - Eazyticks`,
  description: `This Terms & Conditions details how we collects, uses, and discloses Personal Information of our Eazyticks Users.`,
  creator: '@Eazyticks',
  images: ['https://res.cloudinary.com/ddkdvh5ps/image/upload/v1689423314/ezt-templates-assets/Log_Transparent_f5u0p0.png'],
},
robots: {
  index: false,
  follow: false,
  nocache: false,
},
}


function TermsPolicy(){
  return(
    <div className="">
    <Banner title={'Terms & Conditions'} handle={'terms-conditions'} />
    <div className="prose mx-auto max-w-[1200px] pt-10 pb-16 px-3">
      <Terms />
    </div>
  </div>
  )
}

export default TermsPolicy