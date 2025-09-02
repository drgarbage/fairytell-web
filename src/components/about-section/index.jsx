import React from "react";

function AboutSection({ model }) {
  return (
    <div className="mb-8">
      <h4 className="text-xl font-bold text-gray-900 mb-4">關於我</h4>
      <p className="text-gray-600 leading-relaxed">
        {model.intro ? `${model.intro}` : "暫無介紹"}
      </p>
    </div>
  );
}

export default AboutSection;
