export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
        style={{ backgroundImage: "url('/images/privacy-bg.jpg')" }}
      />

      {/* Content Container */}
      <main className="relative z-10 max-w-3xl text-center px-6 py-12 text-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-[#49ce71] mb-8">
          Privacy Policy
        </h1>

        <p className="text-lg md:text-xl mb-6">
          <strong>Effective Date:</strong> June 15, 2025
        </p>

        <p className="text-lg md:text-xl mb-8">
          Welcome to <strong>Heritage Heavens Lucknow</strong>. We are committed to protecting your privacy and ensuring a secure experience on our site.
        </p>

        <h2 className="text-2xl md:text-3xl text-[#49ce71] font-semibold mb-4">1. Introduction</h2>
        <p className="text-base md:text-lg mb-6">
          This Privacy Policy outlines how we collect, use, store, and protect your personal data...
        </p>

        <h2 className="text-2xl md:text-3xl text-[#49ce71] font-semibold mb-4">2. Information We Collect</h2>
        <ul className="text-base md:text-lg mb-6">
          <li>Personal Information (name, email, etc.)</li> 
          <li>or </li>
          Non-Personal Information (browser, IP, etc.)
        </ul>

        <h2 className="text-2xl md:text-3xl text-[#49ce71] font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="text-base md:text-lg mb-6">
          To improve your experience, respond to inquiries, personalize content, etc.
        </p>

           <h2 className="text-2xl md:text-3xl text-[#49ce71] font-semibold mb-4">4. Sharing Your Information</h2>
        <p className="text-base md:text-lg">
          <strong>We do not sell, rent, or trade</strong> your personal information to third parties.
         Service providers for analytics, hosting, or performance tools (e.g., Google Analytics, Vercel, or other cloud providers)
        and Law enforcement, if required by law or regulation.
         
        </p>

        <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">5. Cookies & Tracking</h2>
        <p className="text-base md:text-lg">
          Our site may use cookies and similar tracking technologies to enhance user experience. You can manage cookie preferences in your browser settings.
        </p>
   
           <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">6. Your Rights</h2>
        
          
          <div className="text-base md:text-lg">
          <p>You have rights to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Ask for corrections or deletions</li>
            <li>Withdraw consent (for newsletter or data usage)</li>
            <li>Contact us for any privacy-related questions</li>
          </ul>
        </div>

        

           <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">7. Data Security</h2>
        <p className="text-base md:text-lg">
         We take appropriate technical and organizational measures to protect your data 
         from unauthorized access, loss, or misuse.
        </p>
        
        
           <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">8. Children’s Privacy</h2>
        <p className="text-base md:text-lg">
            Our website is not intended for children under 13. 
            We do not knowingly collect personal data from minors.
        </p>

           <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">8. Changes to This Policy</h2>
        <p className="text-base md:text-lg">
            We may update this Privacy Policy periodically. 
            Changes will be posted on this page with an updated revision date.
        </p>
      

           <h2 className="text-[#49ce71] text-2xl md:text-3xl font-bold text-center mt-8 mb-4">10. Contact us</h2>
      
        
        
             

             <div className="space-y-"> 
            <div className="text-center mt-4 space-y-2">
            <p><strong>📧 Email:</strong> heritageheavenslucknow@gmail.com</p>
            <p><strong>☎️Contact Number:</strong> +91 97581 86377 </p>           
        </div>
        </div>
        
     </main>
    </div>
  );
}
