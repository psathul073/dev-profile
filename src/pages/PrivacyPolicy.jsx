
const PrivacyPolicy = () => {
  return (
    <div className="relative h-full px-4 md:px-6 w-full max-w-6xl mx-auto bg-white dark:bg-black text-gray-700 dark:text-gray-300">
      <div className="px-2 py-4 space-y-4">
        <h1 className="text-lg font-semibold">Privacy Policy</h1>
        <p className="text-sm">Last Updated: 14/08/2025</p>
        <p>
          We respect your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and
          protect your data.
        </p>
        <hr className="text-gray-200 dark:text-gray-800" />
        <br />
        <h1 className="font-medium">1. Information We Collect</h1>
        <ul className=" list-disc text-sm ml-5">
          <li>
            <strong>Authentication Data :</strong> Name, email, profile picture
            from GitHub or Google
          </li>
          <li>
            <strong>Project Data :</strong> Titles, descriptions, live/demo URLs,
            like counts
          </li>
          <li>
            <strong> Usage Data :</strong> Total likes, project views, and
            interactions
          </li>
        </ul>
        <hr className="text-gray-200 dark:text-gray-800" />
        <br />
        <h1 className="font-medium">2. How We Use Your Information</h1>
        <p>We use your data to:</p>
        <ul className=" list-disc text-sm ml-5">
          <li>Display your public projects on your profile</li>
          <li>Keep your private projects visible only to you</li>
          <li>Provide analytics like total projects and total likes</li>
          <li>Improve our platform’s functionality</li>
        </ul>
        <hr className="text-gray-200 dark:text-gray-800" /> <br />
        <h1 className="font-medium">3. Data Sharing</h1>
        <p >We do not sell your personal data.</p>
        <p>
          We may share aggregated data (e.g., “Most liked projects”) without
          revealing personal details.
        </p>
        <hr className="text-gray-200 dark:text-gray-800" /> <br />
        <h1 className="font-medium">4. Data Storage & Security</h1>
        <ul className=" list-disc text-sm ml-5">
          <li>Your data is stored securely in our database</li>
          <li>
            Only authenticated users can view or modify their private data.
          </li>
          <li>
            We take reasonable measures to protect against unauthorized access.
          </li>
        </ul>
        <hr className="text-gray-200 dark:text-gray-800" /> <br />
        <h1 className="font-medium">5. Cookies & Tracking</h1>
        <p>
          We may use cookies for authentication and session management only.
        </p>
        <hr className="text-gray-200 dark:text-gray-800" /> <br />
        <h1 className="font-medium">6. Your Rights</h1>
        <ul className=" list-disc text-sm ml-5">
          <li>You can delete your account and data at any time.</li>
          <li>You can update your projects and profile information.</li>
        </ul>
        <h1 className="font-medium">7. Changes to This Policy</h1>
        <p>
          We may update this Privacy Policy periodically. Continued use means
          you accept the changes.
        </p>
        <hr className="text-gray-200 dark:text-gray-800" />
        <br />
        <h1 className="font-medium">8. Contact Us</h1>
        <p>If you have any questions, contact us at: psathul73@gmail.com</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy