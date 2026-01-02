
const TermsCondition = () => {
    return (
      <div className="relative h-full px-4 md:px-6 w-full max-w-6xl mx-auto bg-white dark:bg-black text-gray-700 dark:text-gray-300">
        <div className="px-2 py-4">
          <h1 className="text-lg font-semibold mb-2">Terms & Conditions</h1>
          <p className="text-sm mb-4">Last Updated: 14/08/2025</p>
          <br />
          <p className="mb-4">
            Welcome to <strong>Dev Profile</strong> (“we,” “our,” or “us”). By
            accessing or using our platform, you agree to the following Terms
            and Conditions. If you do not agree, please do not use our services.
          </p>
          <hr className="text-gray-200 dark:text-gray-800" />
          <br />
          <h2 className="font-medium mb-1">1. Use of Service</h2>
          <ul className=" list-disc text-sm ml-5 mb-4">
            <li>You must be at least 13 years old to use Dev Profile.</li>
            <li>
              You agree to use the platform only for lawful purposes and not to
              upload harmful or malicious content.
            </li>
            <li>You are responsible for all content you submit or display.</li>
          </ul>
          <hr className="text-gray-200 dark:text-gray-800" />
          <br />
          <h2 className="font-medium mb-1">2. User Accounts</h2>
          <ul className=" list-disc text-sm ml-5 mb-4 ">
            <li>You can sign in using GitHub or Google authentication</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account.
            </li>
            <li>
              If you suspect unauthorized use of your account, notify us
              immediately.
            </li>
          </ul>
          <hr className="text-gray-200 dark:text-gray-800" />
          <br />
          <h2 className="font-medium mb-1">3. Projects</h2>
          <ul className=" list-disc text-sm ml-5 mb-4">
            <li>
              Public projects you share will be visible to anyone with your
              profile link.
            </li>
            <li>Private projects are visible only to you when signed in.</li>
            <li>
              You grant us a non-exclusive license to display your project data
              within the platform.
            </li>
          </ul>
          <hr className="text-gray-200 dark:text-gray-800" />
          <br />
          <h2 className="font-medium mb-1">4. Likes & Public Interaction</h2>
          <ul className=" list-disc text-sm ml-5 mb-4">
            <li>The like feature is for engagement purposes only.</li>
            <li>We may track total likes and project counts for analytics.</li>
          </ul>
          <hr className="text-gray-200 dark:text-gray-800" /> <br />
          <h2 className="font-medium mb-1">5. Prohibited Uses</h2>
          <p className="mb-1.5 ">You agree not to:</p>
          <ul className=" list-disc text-sm ml-5 mb-4">
            <li>Upload illegal, offensive, or misleading content</li>
            <li>Attempt to hack, reverse-engineer, or disrupt the platform</li>
            <li>Use the platform to impersonate others</li>
          </ul>
          <hr className="text-gray-200 dark:text-gray-800" /> <br />
          <h2 className="font-medium mb-1">6. Termination</h2>
          <p className="mb-5 text-sm">
            We reserve the right to suspend or terminate your account for
            violating these Terms.
          </p>
          <hr className="text-gray-200 dark:text-gray-800" /> <br />
          <h2 className="font-medium mb-1">7. Limitation of Liability</h2>
          <p className="mb-5 text-sm">
            We are not liable for any damages resulting from your use or
            inability to use the service.
          </p>
          <hr className="text-gray-200 dark:text-gray-800" /> <br />
          <h2 className="font-medium mb-1">8. Changes to Terms</h2>
          <p className="mb-5 text-sm">
            We may update these Terms from time to time. Continued use means you
            accept the new Terms.
          </p>
        </div>
      </div>
    );
}

export default TermsCondition