import React from 'react';
import '../homeCss/sec.css';
import { UseAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const Sections = () => {
  const { categories } = UseAppContext();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.5 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div 
      className='cat_page'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants}>Explore our menu</motion.h2>
      <motion.p variants={itemVariants}>
        Tomato is a food app that lets you explore restaurants, browse menus, and order meals effortlessly. Discover new dishes and order favorites conveniently.
      </motion.p>

      <motion.div className="cat_content" variants={containerVariants}>
        {categories.map((item, idx) => (
          <motion.div className="single_item" key={idx} variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Sections;
