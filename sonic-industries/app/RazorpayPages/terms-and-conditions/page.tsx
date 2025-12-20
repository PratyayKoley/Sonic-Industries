export const metadata = {
  title: "Terms & Conditions | Sonic Industries",
  description:
    "Read the terms and conditions of Sonic Industries, covering user responsibilities, website usage rules, and legal agreements.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
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
              By accessing or using the Sonic Industries website and services,
              you agree to be bound by these Terms & Conditions. Please read
              them carefully before using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Use of Website
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                You agree to provide accurate and complete information during
                registration and checkout
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You must not misuse the website or engage in any fraudulent
                activities
              </li>
              <li>
                You must not attempt to gain unauthorized access to our systems
                or networks
              </li>
              <li>You agree to use our services only for lawful purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Product Information
            </h2>
            <p className="text-gray-700">
              We strive to provide accurate product descriptions, images, and
              specifications. However, we do not warrant that product
              descriptions or other content on our website are accurate,
              complete, reliable, current, or error-free. Products are subject
              to availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Orders & Payments
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                All orders are subject to availability and acceptance by Sonic
                Industries
              </li>
              <li>
                We reserve the right to refuse or cancel any order at our
                discretion
              </li>
              <li>Prices are subject to change without prior notice</li>
              <li>
                All prices are listed in Indian Rupees (INR) and include
                applicable taxes unless stated otherwise
              </li>
              <li>
                Payments are processed securely via Razorpay or other supported
                payment methods
              </li>
              <li>
                Full payment must be received before order processing begins
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content on this website, including but not limited to text,
              graphics, logos, images, videos, and software, is the property of
              Sonic Industries or its content suppliers and is protected by
              Indian and international copyright laws. You may not reproduce,
              distribute, or create derivative works from any content without
              our express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              User Conduct
            </h2>
            <p className="text-gray-700 mb-3">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Post or transmit any unlawful, threatening, defamatory, or
                obscene material
              </li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Attempt to impersonate another person or entity</li>
              <li>Collect or store personal data about other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Warranty Disclaimer
            </h2>
            <p className="text-gray-700">
              Our products come with manufacturer warranties as specified. The
              website and services are provided "as is" without any warranties
              of any kind, either express or implied. We do not guarantee that
              our website will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700">
              To the fullest extent permitted by law, Sonic Industries shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising from the use of our services or products.
              Our total liability shall not exceed the amount paid by you for
              the specific product or service in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Indemnification
            </h2>
            <p className="text-gray-700">
              You agree to indemnify and hold harmless Sonic Industries, its
              officers, directors, employees, and agents from any claims,
              damages, losses, liabilities, and expenses arising from your use
              of our website or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Modifications to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms & Conditions at any
              time. Changes will be effective immediately upon posting on this
              page. Your continued use of our website after changes are posted
              constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Governing Law & Jurisdiction
            </h2>
            <p className="text-gray-700">
              These Terms & Conditions shall be governed by and interpreted in
              accordance with the laws of India. Any disputes arising from these
              terms shall be subject to the exclusive jurisdiction of the courts
              in Pune, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Severability
            </h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall continue in full
              force and effect.
            </p>
          </section>

          <section className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms & Conditions, please contact us:
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
          </section>
        </div>
      </div>
    </div>
  );
}
