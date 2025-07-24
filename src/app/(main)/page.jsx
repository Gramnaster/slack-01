// import { redirect } from 'next/navigation';
import Navigation from "@/components/Navigation/Navigation";
import React from "react";
import PropTypes from "prop-types";

// Give the component a descriptive name
export default function HomePage({children}) {
  // This page will be the default for logged-in users.
  // You can redirect to a default channel or show a welcome message.
  // For now, let's redirect to a general channel as an example.
  // redirect('/directMessages');
  return (
    <div>
      Home page
      <Navigation/>
      {children}
    </div>
  )
}

HomePage.propTypes = {
    children: PropTypes.node.isRequired
};
