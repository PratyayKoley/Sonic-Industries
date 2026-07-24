export const metadata = {
  title: "Refund & Cancellation Policy | Sonic Industries",
  description:
    "Read the refund and cancellation policy of Sonic Industries, detailing the process, timelines, and conditions for refunds or order cancellations.",
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              At Sonic Industries, we strive to ensure customer satisfaction
              with our products and services. This policy outlines the terms and
              conditions for order cancellations and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Order Cancellation
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Before Shipment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Orders can be cancelled within 24 hours of placing the order
                    without any charges
                  </li>
                  <li>
                    To cancel an order, please contact us immediately via phone
                    or email
                  </li>
                  <li>
                    Once cancelled, you will receive a full refund within 5-7
                    business days
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">After Shipment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Once the order has been shipped, cancellation is not allowed
                  </li>
                  <li>
                    You may refuse delivery at the time of receipt if you no
                    longer wish to accept the order
                  </li>
                  <li>
                    In case of refused delivery, standard return and refund
                    procedures will apply
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Return Eligibility
            </h2>
            <p className="text-gray-700 mb-3">
              Products may be eligible for return if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>The product is defective, damaged, or not as described</li>
              <li>Wrong product was delivered</li>
              <li>Product was damaged during transit</li>
              <li>The return request is made within 7 days of delivery</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Important:</strong> Products must be unused, in original
              packaging, with all tags and accessories intact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Refund Process
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Refund Timeline</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Once your return is received and inspected, we will send you
                    an email notification
                  </li>
                  <li>
                    Approved refunds will be processed within 5-7 business days
                  </li>
                  <li>
                    Refunds will be credited to the original payment method
                  </li>
                  <li>
                    Depending on your bank or payment provider, it may take
                    additional 2-5 business days for the amount to reflect in
                    your account
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Refund Method</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Refunds will be credited to the original payment method used
                    during purchase
                  </li>
                  <li>
                    For cash on delivery orders, refunds will be processed via
                    bank transfer (bank details required)
                  </li>
                  <li>No refunds will be provided in cash</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Non-Refundable Items
            </h2>
            <p className="text-gray-700 mb-3">
              The following items are not eligible for refund or return:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Customized or made-to-order products</li>
              <li>Products that have been used, installed, or altered</li>
              <li>
                Products without original packaging or with damaged packaging
              </li>
              <li>Products purchased during clearance or final sale</li>
              <li>Consumable items or spare parts (unless defective)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Shipping Charges
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Original shipping charges are non-refundable</li>
              <li>
                For defective or wrong products, we will bear the return
                shipping cost
              </li>
              <li>
                For returns due to change of mind, customer is responsible for
                return shipping costs
              </li>
              <li>
                We recommend using a trackable shipping service for returns
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Partial Refunds
            </h2>
            <p className="text-gray-700 mb-3">
              Partial refunds may be granted in the following situations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Product shows signs of use or minor damage not caused during
                transit
              </li>
              <li>
                Product is returned without all original accessories or
                documentation
              </li>
              <li>Product is returned after the designated return period</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Exchange Policy
            </h2>
            <p className="text-gray-700">
              We currently do not offer direct product exchanges. If you need a
              different product, please return the original item for a refund
              and place a new order. We will prioritize processing your new
              order once the return is approved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Initiate a Return
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Contact our customer support via email or phone within 7 days of
                delivery
              </li>
              <li>
                Provide your order number, product details, and reason for
                return
              </li>
              <li>
                Our team will review your request and provide return
                instructions
              </li>
              <li>Pack the product securely in its original packaging</li>
              <li>Ship the product to the address provided by our team</li>
              <li>Once received, we will inspect and process your refund</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Damaged or Defective Products
            </h2>
            <p className="text-gray-700 mb-3">
              If you receive a damaged or defective product:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Contact us immediately with photos of the damage</li>
              <li>Do not use or install the product</li>
              <li>
                We will arrange for a replacement or full refund at no
                additional cost
              </li>
              <li>Return shipping will be covered by Sonic Industries</li>
            </ul>
          </section>

          <section className="bg-green-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us for Refunds & Cancellations
            </h2>
            <p className="text-gray-700 mb-4">
              For refund or cancellation requests, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> support@thesonicindustries.com
              </p>
              <p>
                <strong>Phone:</strong> +91 801 073 5898
              </p>
              <p>
                <strong>Working Hours:</strong> Monday to Friday, 10:00 AM –
                6:00 PM IST
              </p>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Please have your order number ready when
                contacting us for faster processing.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
