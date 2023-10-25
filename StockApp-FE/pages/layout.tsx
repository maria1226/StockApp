import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode[]; // Update the type to accept an array of children
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="main">
      <div className="mainDiv">
        <h1 className="bigTitle">
          <span className="welcomeTexjt">Stock Insights Dashboard</span>
        </h1>
        <div className="research">Unlock the Market's Potential</div>
        <div className="line" />
      </div>
      {children} 
    </main>
  );
}
