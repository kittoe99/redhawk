import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { HawkFooter } from "@/components/hawk-footer"

export const metadata: Metadata = {
  title: "Terms of Service | Redhawk Relocation",
  description:
    "Terms of Service for Redhawk Relocation - A technology platform connecting customers with independent moving professionals.",
}

export default function TermsPage() {
  return (
    <>
      <MainNav />
      <main className="flex-1 pt-16">
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-xl text-primary-100">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </section>

          {/* Terms Content */}
          <section className="py-16">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to Redhawk Relocation ("we," "our," or "us"). These Terms of Service ("Terms") govern your
                    use of our website and technology platform (the "Service") operated by Redhawk Relocation.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Important:</strong> Redhawk Relocation is a technology platform that connects customers with
                    independent moving professionals and service providers. We are NOT a moving company and do not
                    provide moving services directly. All moving and related services are provided by independent
                    third-party contractors who use our platform.
                  </p>
                </div>

                {/* Platform Nature */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Nature of Our Platform</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Technology Platform</h3>
                  <p className="text-gray-700 mb-4">
                    Redhawk Relocation operates as a technology platform that facilitates connections between customers
                    seeking moving services and independent service providers who offer such services.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Independent Contractors</h3>
                  <p className="text-gray-700 mb-4">
                    All moving professionals, helpers, and service providers available through our platform are
                    independent contractors. They are not employees, agents, or representatives of Redhawk Relocation.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 No Direct Services</h3>
                  <p className="text-gray-700 mb-4">
                    We do not own moving trucks, employ movers, or directly provide any moving, packing, or related
                    services. Our role is limited to providing the technology platform that enables these connections.
                  </p>
                </div>

                {/* User Responsibilities */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Accurate Information</h3>
                  <p className="text-gray-700 mb-4">
                    You agree to provide accurate, current, and complete information when using our platform and to
                    update such information as necessary.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Direct Relationship</h3>
                  <p className="text-gray-700 mb-4">
                    You acknowledge that any contractual relationship for moving services is directly between you and
                    the independent service provider, not with Redhawk Relocation.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Due Diligence</h3>
                  <p className="text-gray-700 mb-4">
                    You are responsible for conducting your own due diligence regarding service providers, including
                    verifying their credentials, insurance, and licensing as required by local laws.
                  </p>
                </div>

                {/* Service Provider Terms */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Provider Terms</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Independent Status</h3>
                  <p className="text-gray-700 mb-4">
                    Service providers using our platform are independent contractors responsible for their own business
                    operations, licensing, insurance, and compliance with applicable laws.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Service Quality</h3>
                  <p className="text-gray-700 mb-4">
                    Service providers are solely responsible for the quality, safety, and legality of their services.
                    Redhawk Relocation does not guarantee or warrant the services provided by independent contractors.
                  </p>
                </div>

                {/* Limitations of Liability */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitations of Liability</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Platform Limitation</h3>
                  <p className="text-gray-700 mb-4">
                    Our liability is limited to providing the technology platform. We are not liable for any damages,
                    losses, or issues arising from services provided by independent contractors.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 No Warranty</h3>
                  <p className="text-gray-700 mb-4">
                    We do not warrant or guarantee the performance, quality, or availability of services provided by
                    independent contractors on our platform.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Maximum Liability</h3>
                  <p className="text-gray-700 mb-4">
                    In no event shall Redhawk Relocation's total liability exceed the amount of fees paid by you for use
                    of our platform in the twelve (12) months preceding the claim.
                  </p>
                </div>

                {/* Payment Terms */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Payment Terms</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Platform Fees</h3>
                  <p className="text-gray-700 mb-4">
                    We may charge fees for use of our platform. Any such fees will be clearly disclosed before you incur
                    them.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Service Provider Payments</h3>
                  <p className="text-gray-700 mb-4">
                    Payments for moving services are made directly between customers and service providers. We may
                    facilitate payment processing but are not responsible for payment disputes.
                  </p>
                </div>

                {/* Privacy and Data */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                  <p className="text-gray-700 mb-4">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the Service, to understand our practices.
                  </p>
                </div>

                {/* Prohibited Uses */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
                  <p className="text-gray-700 mb-4">You may not use our platform:</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>
                      To violate any international, federal, provincial, or state regulations, rules, laws, or local
                      ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property rights or the intellectual property rights
                      of others
                    </li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>

                {/* Termination */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your access immediately, without prior notice or liability, for any
                    reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                </div>

                {/* Governing Law */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                  <p className="text-gray-700 mb-4">
                    These Terms shall be interpreted and governed by the laws of the State of Texas, without regard to
                    its conflict of law provisions.
                  </p>
                </div>

                {/* Dispute Resolution */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Dispute Resolution</h2>
                  <p className="text-gray-700 mb-4">
                    Any disputes arising from these Terms or your use of the Service shall be resolved through binding
                    arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                    revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                    effect.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Redhawk Relocation</strong>
                    </p>
                    <p className="text-gray-700 mb-2">6001 W Parmer Lane, Ste 370</p>
                    <p className="text-gray-700 mb-2">Austin, TX 78727</p>
                    <p className="text-gray-700 mb-2">Email: legal@redhawkrelocation.com</p>
                    <p className="text-gray-700">Phone: (555) 123-4567</p>
                  </div>
                </div>

                {/* Acknowledgment */}
                <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">Acknowledgment</h3>
                  <p className="text-primary-700">
                    By using our Service, you acknowledge that you have read these Terms of Service and agree to be
                    bound by them. You also acknowledge that Redhawk Relocation is a technology platform and not a
                    moving company.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <HawkFooter />
    </>
  )
}
