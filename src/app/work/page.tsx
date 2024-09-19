import "@/styles/globals.css"

export default function WorkPage() {
  const experiences = [
    {
      title: 'Tech Mahindra Internship',
      position: 'Intern',
      duration: 'June 2024 - August 2024',
      description: 'Worked on improving end-user performance, collaborating with deskside engineers, and providing desktop engineering support. Assisted with service management reports and coordinated meetings with key leads and managers.',
    },
    {
      title: 'Whirlpool Corporation Project',
      position: 'Machine Learning Intern',
      duration: 'June 2024 - August 2024',
      description: 'Contributed to the development of a machine learning application to personalize user experiences with Whirlpool ovens, utilizing Dart, JavaScript, Plotly, MongoDB, FastAPI, and a fine-tuned BERT model.',
    },
    {
      title: 'Grocery App Development',
      position: 'Android Developer',
      duration: 'August 2024',
      description: 'Developed a grocery app in Android Studio, focusing on improving user experience and integrating features for efficient grocery management.',
    },
    // Add more experiences as needed
  ];

  return (
<section className="p-8">
      <h1 className="text-4xl text-white font-bold mb-6">Work Experience</h1>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
            
          <div
            key={index}
            className="relative bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:translate-y-[-8px]"
          >
            <h2 className="text-2xl font-semibold mb-2">{experience.title}</h2>
            <p className="text-lg font-medium mb-1">{experience.position}</p>
            <p className="text-gray-600 mb-4">{experience.duration}</p>
            <p>{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
