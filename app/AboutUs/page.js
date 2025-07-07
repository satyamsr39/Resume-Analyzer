import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🧠 About Us</h2>

      <p className="mb-6 text-lg leading-relaxed">
        <strong>IntelliHire</strong> is a smart, AI-powered resume analyzer that helps companies hire smarter and faster. Built on the cutting-edge capabilities of Google GenAI, our platform goes beyond simple keyword checks — we understand the content, context, and structure of every resume and match it precisely with the job description you provide.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Whether you&apos;re a <span className="text-green-700 font-semibold">recruiter</span> seeking qualified talent or a <span className="text-purple-700 font-semibold">job seeker</span> aiming to optimize your profile, IntelliHire delivers meaningful, actionable results in seconds.
      </p>

      <h3 className="text-2xl font-semibold text-blue-600 mb-4">🚀 Why IntelliHire?</h3>

      <ul className="list-disc pl-6 space-y-3 text-lg">
        <li>⚡ <strong>Batch Upload Resumes:</strong> Analyze dozens of resumes at once and get instant match reports—no more manual filtering.</li>
        <li>🎯 <strong>Contextual Matching:</strong> Our AI evaluates resumes based on experience, skills, and role relevance—not just keywords.</li>
        <li>📈 <strong>Visual Match Score:</strong> Each resume gets a percentage score for easy comparison and faster decision-making.</li>
        <li>✅ <strong>Shortlist the Best Instantly:</strong> Know who to interview without reading a single resume line-by-line.</li>
        <li>💡 <strong>AI Recommendations:</strong> Get personalized resume improvement suggestions based on job requirements.</li>
        <li>📁 <strong>Exportable Reports:</strong> Save or share analysis reports with your hiring team for collaborative decisions.</li>
        <li>🔒 <strong>Secure & Confidential:</strong> Resume data is processed securely and never shared—your trust matters.</li>
      </ul>

      <h3 className="text-2xl font-semibold text-blue-600 mt-10 mb-4">🙌 Built For Everyone</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h4 className="text-xl font-bold text-green-700 mb-2">📌 For Recruiters</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Save recruiter&apos;s screening time with automatic scoring.</li>
            <li>Quickly identify best-fit candidates from bulk uploads.</li>
            <li>Make data-driven hiring decisions, faster and smarter.</li>
            <li>Use it across multiple roles—tech, marketing, HR, and more.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h4 className="text-xl font-bold text-purple-700 mb-2">🧑‍💼 For Job Seekers</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Know exactly how your resume compares for a role.</li>
            <li>Get precise feedback to boost your chances of selection.</li>
            <li>Tailor your resume before applying—stand out in seconds.</li>
          </ul>
        </div>
      </div>

      <p className="mt-10 text-lg text-center text-gray-600">
        🚀 Whether you&apos;re hiring or applying, IntelliHire empowers you with clarity, speed, and precision.
      </p>
    </div>
  );
};

export default About;
