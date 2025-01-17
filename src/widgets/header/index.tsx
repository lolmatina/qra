'use client'

import React from 'react'
import Navigation from '../navigation'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import * as motion from "motion/react-client"

const Header = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Navigation />
      <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-no-repeat bg-bottom relative text-white">
        <div className="container mx-auto h-full">
          <div className='relative z-10 text-center flex flex-col gap-8 justify-center items-center h-full'>
            <motion.h1 
              initial={{ opacity: 0, translateY: "100%" }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
              className='text-5xl font-bold w-3xl uppercase'
            >
              Инновационные решения <br /> 
              <span className='text-2xl font-semibold'>для безопасности и эффективности</span>
            </motion.h1>
            <motion.span 
              className='text-lg max-w-5xl'
              initial={{ opacity: 0, translateY: "100%" }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                  delay: 0.4,
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
            >
                Qaz Rail Automatic – лидер в области разработки и производства систем микропроцессорной централизации для железнодорожной инфраструктуры. Мы предоставляем решения, которые повышают безопасность, оптимизируют перевозочный процесс и минимизируют эксплуатационные расходы.
            </motion.span>
            <div className='flex gap-4'>
              <Button variant='outline' color='red'>
                Подробнее
              </Button>
              <Button variant='outline' color='white'>
                Перейти к продукции
              </Button>
            </div>
          </div>
        </div>
        <div className='absolute bg-black left-0 top-0 right-0 bottom-0 opacity-50'></div>
      </div>
    </div>
  )
}

export default Header