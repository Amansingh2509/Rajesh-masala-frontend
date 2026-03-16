import React from "react";
import CreateItemOwner from "../item-owner/createitemowner";

const OwnerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Owner Dashboard</h1>
      <CreateItemOwner />
    </div>
  );
};

export default OwnerDashboard;
