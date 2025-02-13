import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import NavigationLink from '@/src/entities/navigation-link';
import logo from './logo.png';

const Navigation = () => {
  return (
    <div>
      <div className="max-w-[1280px] mx-auto pt-4 z-10 relative flex -mb-10">
        <Link href="/">
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image src={logo} alt="QazRailAutomatic" width={180} />
          </motion.div>
        </Link>
      </div>
      <nav className="shadow-lg">
        <div className="max-w-[1280px] mx-auto flex justify-end pr-8">
          <ul className="inline-flex gap-[3px] bg-[#405561] skew-x-[-25deg] relative z-10 hover:sca shadow-md">
            <NavigationLink href="/#services">Услуги</NavigationLink>
            <NavigationLink href="/#about">О компании</NavigationLink>
            <NavigationLink href="/#certificates">Cертификаты</NavigationLink>
            <NavigationLink href="/#contacts">Контакты</NavigationLink>
            <NavigationLink href="/news">Новости</NavigationLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
