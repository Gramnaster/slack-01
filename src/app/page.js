// import { redirect } from 'next/navigation';
import React from "react";
import Navigation from "@/components/Navigation/Navigation";
import PropTypes from "prop-types";

export default function RootPage({children}) {
  // By default, redirect logged-in users to a general channel.
  // The middleware already ensures only authenticated users can see this.
  // redirect('/login');
  return (
    <div>
      Root Page
      <Navigation />
      {children}
    </div>
  )
}

RootPage.propTypes = {
    children: PropTypes.node.isRequired
};
