import React from 'react'
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const CheckSkelt = styled(Stack)({
   padding: '2em 0em',
   flexWrap: 'wrap',
   alignItems: 'start',
   flexDirection: 'row',
   justifyContent: 'space-between',
   gap: '1em',
   "& .new":{
     flexBasis: 'calc(33% - 1em)',
     width: 'calc(33% - 1em)',
   },
   "& .half":{
    flexBasis: 'calc(49% - 1em)',
    width: 'calc(49% - 1em)',
  },
   "& .full":{
     flexBasis: '100%',
     width: '100%',
   },
   "@media(max-width:1124px)":{
        "& .first":{
            flexBasis: '100%',
            width: '100%',
        },
        "& .second, .third":{
            flexBasis: 'calc(50% - 1em)',
            width: 'calc(50% - 1em)',
          },
          "& .five, .six , .siven-half":{
            display: 'none'
          },
          "& .seven, .eight":{
            flexBasis: 'calc(40% - 1em)',
            width: 'calc(40% - 1em)',
          },
   }
})

const CheckoutSkelton = () => {
  return (
    <CheckSkelt>
        <Skeleton variant="rounded" className="new first" height={50} animation="wave"/>
        <Skeleton variant="rounded" className="new second" height={50} animation="wave"/>
        <Skeleton variant="rounded" className="new third" height={50} animation="wave"/>
        <Skeleton variant="rounded" className="full four" height={50} animation="wave" />
        <Skeleton variant="rounded" className="half five" height={50} animation="wave"/>
        <Skeleton variant="rounded" className="half six" height={50} animation="wave"/>
        <Skeleton variant="rounded" className="new seven" height={50} animation="wave"/>
        <div className='new siven-half'><span></span></div>
        <Skeleton variant="rounded" className="new eight" height={50} animation="wave"/>
    </CheckSkelt>
  )
}

export default CheckoutSkelton