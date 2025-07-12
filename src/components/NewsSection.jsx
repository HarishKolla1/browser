import React from 'react';


const dummyNews = [
    {
      title: "AI is revolutionizing web browsers",
      description: "New AI-powered browsers are changing how we search and explore the web.",
    },
    {
      title: "React 19 Released",
      description: "The latest version of React introduces exciting new features for developers.",
    },
    {
      title: "SpaceX launches new rocket",
      description: "SpaceX successfully launched its latest rocket carrying several satellites.",
    },
    {
      title: "Apple unveils new VR headset",
      description: "Apple has entered the VR space with an innovative new headset.",
    },
    {
      title: "Climate change report updated",
      description: "A new UN report highlights urgent actions needed for climate change.",
    },
    {
      title: "Electric cars hit record sales",
      description: "EV sales are surging globally, driven by new government incentives.",
    },
    {
      title: "Gaming industry growth in 2025",
      description: "The gaming market is set to exceed $300 billion by 2025.",
    },
    {
      title: "New breakthroughs in AI chips",
      description: "Chipmakers introduce new processors optimized for AI workloads.",
    },
  ];

const NewsSection = () => {
  return (
    <div className='w-full max-w-4xl mt-6 mb-8 px-4'>
        <h2 className='text-xl font-semibold mb-4 text-gray-700'>Trending News</h2>
        <div className='space-y-4 h-96 overflow-y-auto pr-2'> {/* <-- key cham=nge here */}
            {dummyNews.map((news, index) => (
                <div key={index} className='p-4 bg-white rounded shadow hover:shadow-md transition'>
                    <h3 className='text-lg font-medium'>{news.title}</h3>
                    <p className='text-gray-600'>{news.description}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default NewsSection;