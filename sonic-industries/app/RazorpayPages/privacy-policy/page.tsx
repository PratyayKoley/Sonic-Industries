export const metadata = {
  title: "Privacy Policy | Sonic Industries",
  description:
    "Read the privacy policy of Sonic Industries, covering how we handle user data, payments, and personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
              This Privacy Policy describes how Sonic Industries collects, uses,
              and protects your personal information when you use our website
              and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-3">
              We may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping and billing address</li>
              <li>
                Payment-related information (processed securely by payment
                gateways)
              </li>
              <li>Business information (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Process orders and payments</li>
              <li>Deliver products and services</li>
              <li>Communicate order updates and shipping information</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Payment Information
            </h2>
            <p className="text-gray-700">
              All payment transactions are processed securely through trusted
              third-party payment gateways such as Razorpay. We do not store
              your card details, UPI information, or other sensitive payment
              data on our servers. Your payment information is encrypted and
              handled in compliance with industry standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-700">
              We implement reasonable security measures to protect your personal
              information from unauthorized access, disclosure, alteration, or
              destruction. However, no method of transmission over the internet
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-700">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted service
              providers who assist us in operating our website and conducting
              our business, provided they agree to keep your information
              confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Cookies
            </h2>
            <p className="text-gray-700">
              Our website may use cookies to enhance user experience. You can
              choose to accept or decline cookies through your browser settings.
              However, declining cookies may limit your access to certain
              features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically.
            </p>
          </section>

          <section className="bg-purple-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              For any questions or concerns regarding this Privacy Policy,
              please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> support@sonicindustries.com
              </p>
              <p>
                <strong>Phone:</strong> +91 801 073 5898
              </p>
              <p>
                <strong>Address:</strong> Sonic Industries, Pune, Maharashtra,
                India
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
