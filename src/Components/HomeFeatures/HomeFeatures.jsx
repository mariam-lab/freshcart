import {
  faHeadset,
  faRotateLeft,
  faShieldHalved,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeFeatures() {
  return (
    <>
      <section id="features" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4 border border-gray-100 rounded-lg">
              <div className="h-12 me-2  w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faTruck} className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-gray-500">Orders $50 or more</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-100 rounded-lg">
              <div className="h-12 me-2 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faRotateLeft} className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium">30 Days Return</h3>
                <p className="text-sm text-gray-500">Satisfaction guaranteed</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-100 rounded-lg">
              <div className="h-12 me-2 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% protected checkout</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-gray-100 rounded-lg">
              <div className="h-12 me-2 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faHeadset} className="text-xl" />
              </div>
              <div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-gray-500">Ready to help anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
