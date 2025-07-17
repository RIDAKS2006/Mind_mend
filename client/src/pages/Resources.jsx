import React from 'react';

const resources = {
  Breathing: [
    {
      title: "5-Minute Breathing Exercise",
      videoId: "SEfs5TJZ6Nk",
      link: "https://www.youtube.com/watch?v=oxdMIe11rQE&pp=ygUbNSBtaW51dGUgYnJlYXRoaW5nIGV4ZXJjaXNl0gcJCc0JAYcqIYzv",
    },
    {
      title: "Box Breathing Technique",
      videoId: "FJJazKtH_9I",
      link: "https://www.youtube.com/watch?v=FJJazKtH_9I",
    },
  ],
  Meditate: [
    {
      title: "10 Minute Meditation for Anxiety",
      videoId: "inpok4MKVLM",
      link: "https://www.youtube.com/watch?v=inpok4MKVLM",
    },
    {
      title: "Guided Sleep Meditation",
      videoId: "ZToicYcHIOU",
      link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    },
  ],
  "Channel Your Thoughts": [
    {
      title: "Journaling for Mental Clarity",
      videoId: "5_gG4U2yDHA",
      link: "https://www.youtube.com/watch?v=UbGtaYRmQZI&pp=ygUZam91cm5hbCBmb3IgbWVudGFsIGhlYWx0aA%3D%3D",
    },
    {
      title: "Stop Overthinking in 2 Minutes",
      videoId: "C5Z0GwbM6gY",
      link: "https://www.youtube.com/watch?v=tK2LaefZcy8&t=309s&pp=ygURb3ZlcnRoaW5raW5nIGhlbHA%3D",
    },
  ],
};

const Resources = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Self‑Help Resources</h1>

      {Object.keys(resources).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources[category].map((res, idx) => (
              <div key={idx} className="bg-white rounded shadow p-4">
                <a href={res.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://img.youtube.com/vi/${res.videoId}/0.jpg`}
                    alt={res.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <p className="text-blue-600 hover:underline text-sm text-center">
                    {res.title}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;
