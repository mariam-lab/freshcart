import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

export default function CartFeature() {
  return (
    <>
      <div className="grid grid-cols-1  gap-4">
        <div className="flex  items-center p-4 border border-gray-100 rounded-lg bg-gray-200/20">
          <div className="h-12 me-2  w-12  text-primary-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTruck} className="text-xl" />
          </div>
          <div>
            <h3 className="font-bold">Free Delivery</h3>
            <p className="text-sm text-gray-500">Orders $50 or more</p>
          </div>
        </div>

        <div className="flex items-center p-4 border border-primary-300 rounded-lg bg-primary-100  ">
          <div className="h-12 me-2 w-12 text-primary-600 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
          </div>
          <div>
            <h3 className="font-bold">Secure Payment</h3>
            <p className="text-sm text-gray-500">100% protected checkout</p>
          </div>
        </div>
      </div>
    </>
  );
}
