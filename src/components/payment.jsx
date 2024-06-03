import { getAllPayment, totalBooking } from "@/api/payment";
import React, { useEffect } from "react";

function Payment() {
  //   const getPayments = async () => {
  //     const payments = await totalBooking();
  //     console.log(payments);
  //   };

  //   useEffect(() => {
  //     getPayments();
  //   });

  return (
    <div className="w-full">
      <h1 className="font-bold py-6 text-4xl">Payments</h1>
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src="https://media1.tenor.com/m/iKpYOrp3YvQAAAAC/roblox-down-roblox-update.gif"
          alt=""
        />
        <p>Coming Soon....</p>
      </div>
    </div>
  );
}

export default Payment;
