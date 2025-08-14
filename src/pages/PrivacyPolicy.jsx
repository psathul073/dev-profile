import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className=" h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex md:items-center justify-center p-3 max-sm:p-2.5 overflow-y-auto scroll-smooth">
      <div className="relative h-fit w-full max-w-[1024px] p-3.5 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins">
        <h1 className="text-lg font-bold mb-1">🔒 Privacy Policy</h1>
        <p className="text-sm mb-4">Last Updated: 14/08/2025</p>

        <p className="mb-4">We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your data.</p>
        <hr className="text-indigo-900/20" /><br />

        <h1 className="font-bold mb-1">1. Information We Collect</h1>
        <ul className=" list-disc ml-5 mb-4">
          <li><strong>Authentication Data:</strong> Name, email, profile picture from GitHub or Google</li>
          <li><strong>Project Data:</strong> Titles, descriptions, live/demo URLs, like counts</li>
          <li><strong> Usage Data:</strong> Total likes, project views, and interactions</li>
        </ul>

        <hr className="text-indigo-900/20"  /><br />

        <h1 className="font-bold mb-1">2. How We Use Your Information</h1>
        <p>We use your data to:</p>
        <ul className=" list-disc ml-5 mb-4">
          <li>Display your public projects on your profile</li>
          <li>Keep your private projects visible only to you</li>
          <li>Provide analytics like total projects and total likes</li>
          <li>Improve our platform’s functionality</li>
        </ul>
        <hr className="text-indigo-900/20" /> <br />

        <h1 className="font-bold mb-1">3. Data Sharing</h1>
        <p>We do not sell your personal data.</p>
        <p>We may share aggregated data (e.g., “Most liked projects”) without revealing personal details.</p>
        <hr className="text-indigo-900/20" /> <br />

        <h1 className="font-bold mb-1">4. Data Storage & Security</h1>
        <ul className=" list-disc ml-5 mb-4">
          <li>Your data is stored securely in our database</li>
          <li>Only authenticated users can view or modify their private data.</li>
          <li>We take reasonable measures to protect against unauthorized access.</li>
        </ul>
        <hr className="text-indigo-900/20" /> <br />

        <h1 className="font-bold mb-1">5. Cookies & Tracking</h1>
        <p>We may use cookies for authentication and session management only.</p>
        <hr className="text-indigo-900/20" /> <br />

        <h1 className="font-bold mb-1">6. Your Rights</h1>
        <ul className=" list-disc ml-5 mb-4">
          <li>You can delete your account and data at any time.</li>
          <li>You can update your projects and profile information.</li>
        </ul>

        <h1 className="font-bold mb-1">7. Changes to This Policy</h1>
        <p>We may update this Privacy Policy periodically. Continued use means you accept the changes.</p>
        <hr className="text-indigo-900/20" /><br />

        <h1 className="font-bold mb-1">8. Contact Us</h1>
        <p>If you have any questions, contact us at: psathul73@gmail.com</p>
        

      </div>

    </div>
  )
}

export default PrivacyPolicy