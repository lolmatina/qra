import Link from 'next/link'
import React from 'react'
type Props = {
  children: JSX.Element | string
  href: string
}

const NavigationLink = ({children, href}: Props) => {
  return (
    <li className='text-base text-white transition-all hover:bg-[#405561] bg-[#364854] uppercase tracking-tight font-semibold'>
      <span
        className='inline-block'
      >
        <Link href={href} className='py-4 px-5 inline-block skew-x-[25deg]'>
          {children}
        </Link>
      </span>
    </li>
  )
}

export default NavigationLink