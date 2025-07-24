import React from 'react';
// import PropTypes from "prop-types";
import Navigation from '@/components/Navigation/Navigation';

export default function MainLayout({ children }) {
  return (
    <div>
      Layout.js - Main
      <Navigation />
      <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {/* The content of your page.js files will be rendered here */}
        {children}
      </main>
    </div>
  );
}

// MainLayout.propTypes = {
//     children: PropTypes.node.isRequired
// };
