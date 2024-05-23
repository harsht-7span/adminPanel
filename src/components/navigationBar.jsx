import { Home } from "@/assets/icons/home";
import { Driver } from "@/assets/icons/driver";
import React from "react";
import { PayCard } from "./ui/payCard";
import { Steering } from "./ui/steering";

import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const navItems = [
    {
      name: "Home",
      icon: <Home className="w-6 h-6" />,
      path: "/",
    },
    {
      name: "Driver",
      icon: <Driver className="w-6 h-6" />,
      path: "/drivers",
    },

    {
      name: "Payment",
      icon: <PayCard className="w-6 h-6" />,
    },
    {
      name: "Ride",
      icon: <Steering className="w-6 h-6" />,
    },
  ];

  const location = useLocation();

  return (
    <div>
      <h1 className="font-bold text-2xl">EasyGo</h1>

      <div className="space-y-5 pt-12">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={index} to={item.path}>
              <div
                className={`flex items-center gap-3 cursor-pointer py-3 ${
                  isActive
                    ? "bg-gray-300 border-r-4 border-black"
                    : "hover:bg-gray-300 hover:border-r-4 hover:border-black"
                }`}
              >
                {item.icon}
                <p className="font-normal text-xl">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavigationBar;
