import React from "react";

export default function ShippingTabs() {
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <div>
            <h4 className="text-2xl font-extrabold mb-3">
              Shipping Information
            </h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex">
                <span className="w-32 font-semibold">Standard:</span>
                <span>3-5 business days ($4.99)</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Express:</span>
                <span>1-2 business days ($9.99)</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Free shipping:</span>
                <span>Orders over $50</span>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div>
            <h4 className="font-extrabold text-2xl mb-3">Return Policy</h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex">
                <span className="w-32 font-semibold">Time limit:</span>
                <span>30 days</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Condition:</span>
                <span>Items must be unused and in original packaging</span>
              </div>
              <div className="flex">
                <span className="w-32 font-semibold">Refund:</span>
                <span>Processed within 5-7 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
