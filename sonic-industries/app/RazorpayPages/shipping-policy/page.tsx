export const metadata = {
  title: "Shipping and Delivery Policy | Sonic Industries",
  description:
    "Read the shipping policy of Sonic Industries, covering delivery times, shipping charges, and order tracking information.",
};

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shipping & Delivery Policy
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
              Sonic Industries is committed to delivering your orders safely and
              on time. This policy outlines our shipping procedures, delivery
              timelines, and related information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Shipping Locations
            </h2>
            <p className="text-gray-700 mb-3">
              We currently ship across India to the following locations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All major cities and metro areas</li>
              <li>Tier 2 and Tier 3 cities</li>
              <li>
                Select rural and remote areas (subject to courier
                serviceability)
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Note:</strong> We do not currently ship internationally.
              For bulk or international orders, please contact our sales team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Order Processing Time
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Standard Products
                </h3>
                <p>
                  Orders are typically processed within 1-2 business days after
                  payment confirmation.
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Custom/Made-to-Order Products
                </h3>
                <p>
                  Custom products may require 5-15 business days for
                  manufacturing before shipment.
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Bulk Orders</h3>
                <p>
                  Large quantity orders may require additional processing time.
                  Our team will contact you with a specific timeline.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              <strong>Business days:</strong> Monday to Friday, excluding public
              holidays and weekends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Delivery Timeline
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Location Type
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Metro Cities (Mumbai, Delhi, Bangalore, etc.)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      3-5 business days
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      Tier 2 Cities
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      5-7 business days
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Tier 3 Cities & Remote Areas
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      7-10 business days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-4 text-sm">
              * Delivery timelines are estimates and may vary based on product
              availability, courier partner performance, weather conditions, and
              unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Shipping Charges
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Shipping charges (if applicable) will be calculated and
                displayed at checkout
              </li>
              <li>
                Charges are based on product weight, dimensions, and delivery
                location
              </li>
              <li>
                Free shipping may be available on orders above a certain value
                (promotional offers)
              </li>
              <li>
                Special handling charges may apply for fragile or oversized
                items
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Shipping Partners
            </h2>
            <p className="text-gray-700 mb-3">
              We work with reliable courier and logistics partners to ensure
              safe delivery:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Blue Dart</li>
              <li>DTDC</li>
              <li>Delhivery</li>
              <li>FedEx</li>
              <li>India Post (for specific locations)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              The choice of courier partner depends on the delivery location and
              product type. We cannot guarantee a specific courier for delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Order Tracking
            </h2>
            <p className="text-gray-700 mb-3">
              Once your order is shipped, you will receive:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Email notification with tracking number</li>
              <li>SMS updates on delivery status</li>
              <li>Real-time tracking link to monitor your shipment</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can also check your order status by logging into your account
              on our website or by contacting customer support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Delivery Process
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Our courier partner will attempt delivery at the address
                provided during checkout
              </li>
              <li>
                A delivery executive will contact you before delivery (if
                contact number is provided)
              </li>
              <li>Please ensure someone is available to receive the package</li>
              <li>
                Valid photo ID proof may be required at the time of delivery
              </li>
              <li>
                Please inspect the package for any visible damage before
                accepting delivery
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Delivery Delays
            </h2>
            <p className="text-gray-700 mb-3">
              Delivery delays may occur due to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Natural calamities, extreme weather conditions</li>
              <li>Political disturbances, strikes, or lockdowns</li>
              <li>Incorrect or incomplete delivery address</li>
              <li>Recipient unavailability</li>
              <li>Customs clearance delays (for select regions)</li>
              <li>Courier partner delays beyond our control</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We are not responsible for delays caused by circumstances beyond
              our control. However, we will make every effort to ensure timely
              delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Failed Delivery Attempts
            </h2>
            <p className="text-gray-700 mb-3">
              If delivery cannot be completed:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>The courier will make up to 3 delivery attempts</li>
              <li>
                You will be notified via SMS/email after each failed attempt
              </li>
              <li>
                The package may be held at the nearest courier facility for
                pickup
              </li>
              <li>
                If the package is not collected within 7 days, it will be
                returned to us
              </li>
              <li>Return shipping charges may be deducted from your refund</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Damaged or Lost Shipments
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Damaged Package</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Do not accept delivery if the package appears severely
                    damaged
                  </li>
                  <li>Take photos of the damaged package</li>
                  <li>Contact us immediately with order details and photos</li>
                  <li>We will arrange for replacement or refund</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Lost Package</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    If your package shows as delivered but you haven't received
                    it, contact us within 48 hours
                  </li>
                  <li>We will investigate with the courier partner</li>
                  <li>
                    Once confirmed as lost, we will process a replacement or
                    refund
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Address Change
            </h2>
            <p className="text-gray-700">
              Once an order is shipped, we cannot change the delivery address.
              Please ensure your shipping address is correct before completing
              your order. If you need to update your address, contact us
              immediately after placing the order (before shipment).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Packaging Standards
            </h2>
            <p className="text-gray-700 mb-3">
              We take great care in packaging to ensure your products arrive
              safely:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All products are packed in sturdy, protective packaging</li>
              <li>Fragile items receive extra cushioning and bubble wrap</li>
              <li>Packages are sealed and labeled properly</li>
              <li>Invoice and shipping documents are included</li>
            </ul>
          </section>

          <section className="bg-orange-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us for Shipping Queries
            </h2>
            <p className="text-gray-700 mb-4">
              For any questions regarding shipping and delivery:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> support@sonicindustries.com
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
                <strong>Tip:</strong> Keep your tracking number handy when
                contacting us for faster resolution.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
