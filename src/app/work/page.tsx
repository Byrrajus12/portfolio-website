import "@/styles/globals.css"

export default function WorkPage() {
  const experiences = [
    {
      title: 'IT Intern',
      company: 'Tech Mahindra',
      duration: 'June 2024 - August 2024',
      description: 'Worked on improving end-user performance, collaborating with deskside engineers, and providing desktop engineering support. Assisted with service management reports and coordinated meetings with key leads and managers.',
    },
    {
      title: 'Capstone App Developer',
      company: 'Whirlpool',
      duration: 'Jan 2024 - May 2024',
      description: 'Contributed to the development of a machine learning application to personalize user experiences with Whirlpool ovens, utilizing Dart, JavaScript, Plotly, MongoDB, FastAPI, and a fine-tuned BERT model.',
    },
    {
      title: 'Student Accountant',
      company: 'MSU Business and Financial Services',
      duration: 'June 2022 - Jan 2023',
      description: 'Handled accounting necessities for BFS at Michigan State University.',
    },
    {
      title: 'Teaching Assistant & Tutor',
      company: 'MSU',
      duration: 'Aug 2021 - Jan 2023',
      description: 'Assisted students in courses as a Teaching assistant, and Tutor: CSE 335, CSE 232, CSE 102, ACC 230, EC 251, MTH 103.',
    },
    {
      title: 'Service Center Representative',
      company: 'MSU',
      duration: 'May 2023- Present',
      description: 'Provided customer service and clerical support to students and visitors, managing inquiries.',
    },
    // Add more experiences as needed
  ];

  return (
<section className="p-8">
      {/* <h2 className="px-6 text-3xl mt-4 text-white font-bold p-14">Work Experience</h2> */}
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-8xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Work Experience
          </h2>
        </div>
        <div className="w-full h-px bg-zinc-800" />
      </div>
      <div className="space-y-6 mt-8">
        {experiences.map((experience, index) => (
            
          <div
            key={index}
            className="relative bg-black p-6 border rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:translate-y-[-6px] border-zinc-600 hover:shadow-lg hover:shadow-white/30"
          >
            <h2 className="mt-4 text-3xl font text-zinc-50 group-hover:text-white sm:text-4xl font-display">{experience.title}</h2>
            <p className="mt-4 leading-8 duration-150 text-zinc-400">{experience.company} | {experience.duration}</p>
            <p className="mt-4 leading-8 duration-150 text-zinc-400">{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
