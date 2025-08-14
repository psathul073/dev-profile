
const TermsCondition = () => {
    return (
        <div className=" h-full w-full bg-gradient-to-t from-indigo-950 to-indigo-200 dark:from-slate-950 dark:to-indigo-950 flex md:items-center justify-center p-3 max-sm:p-2.5 overflow-y-auto scroll-smooth">

            <div className="relative h-fit w-full max-w-[1024px] p-3.5 bg-indigo-50/5 text-indigo-950 dark:text-indigo-50/50 backdrop-blur-xs border border-indigo-200 outline-4 outline-indigo-200/15 shadow-2xl rounded-2xl font-poppins">
                <h1 className="text-lg font-bold mb-1">📜 Terms & Conditions</h1>
                <p className="text-sm">Last Updated: 14/08/2025</p>
                <br />
                <p className="mb-4">Welcome to <strong>Dev Profile</strong> (“we,” “our,” or “us”).
                    By accessing or using our platform, you agree to the following Terms and Conditions.
                    If you do not agree, please do not use our services.
                </p>
                <hr className="text-indigo-900/20" />
                <br />
                <h1 className="font-bold mb-1">1. Use of Service</h1>
                <ul className=" list-disc ml-5 mb-4">
                    <li>You must be at least 13 years old to use Dev Profile.</li>
                    <li>You agree to use the platform only for lawful purposes and not to upload harmful or malicious content.</li>
                    <li>You are responsible for all content you submit or display.</li>
                </ul>

                <hr className="text-indigo-900/20" />
                <br />
                <h1 className="font-bold mb-1">2. User Accounts</h1>
                <ul className=" list-disc ml-5 mb-4 ">
                    <li>You can sign in using GitHub or Google authentication</li>
                    <li>You are responsible for maintaining the confidentiality of your account.</li>
                    <li>If you suspect unauthorized use of your account, notify us immediately.</li>
                </ul>

                <hr className="text-indigo-900/20" />
                <br />
                <h1 className="font-bold mb-1">3. Projects</h1>
                <ul className=" list-disc ml-5 mb-4" >
                    <li>Public projects you share will be visible to anyone with your profile link.</li>
                    <li>Private projects are visible only to you when signed in.</li>
                    <li>You grant us a non-exclusive license to display your project data within the platform.</li>
                </ul>

                <hr className="text-indigo-900/20" />
                <br />

                <h1 className="font-bold mb-1">4. Likes & Public Interaction</h1>
                <ul className=" list-disc ml-5 mb-4">
                    <li>The like feature is for engagement purposes only.</li>
                    <li>We may track total likes and project counts for analytics.</li>
                </ul>

                <hr className="text-indigo-900/20" /> <br />
                <h1 className="font-bold mb-1" >5. Prohibited Uses</h1>
                <p>You agree not to:</p>
                <ul className=" list-disc ml-5 mb-4">
                    <li>Upload illegal, offensive, or misleading content</li>
                    <li>Attempt to hack, reverse-engineer, or disrupt the platform</li>
                    <li>Use the platform to impersonate others</li>
                </ul>

                <hr className="text-indigo-900/20" /> <br />
                <h1 className="font-bold mb-1" >6. Termination</h1>
                <p className="mb-5">We reserve the right to suspend or terminate your account for violating these Terms.</p>

                <hr className="text-indigo-900/20" /> <br />
                <h1 className="font-bold mb-1">7. Limitation of Liability</h1>
                <p className="mb-5">We are not liable for any damages resulting from your use or inability to use the service.</p>

                <hr className="text-indigo-900/20" /> <br />
                <h1 className="font-bold mb-1">8. Changes to Terms</h1>
                <p className="mb-5">We may update these Terms from time to time. Continued use means you accept the new Terms.</p>

            </div>

        </div>
    )
}

export default TermsCondition