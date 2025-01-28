import "@/styles/globals.css"

export default function WorkPage() {
  const experiences = [
    {
      title: 'IT Intern',
      company: 'Tech Mahindra',
      website: 'https://www.techmahindra.com/',
      duration: 'June 2024 - August 2024',
      description: 'Optimized BI charts to track key metrics at Jackson National, delivering revenue-generating insights to stakeholders.',
    },
    {
      title: 'Capstone App Developer',
      company: 'Whirlpool',
      website: 'https://www.whirlpool.com/',
      duration: 'Jan 2024 - May 2024',
      description: 'Developed a smart oven API powered by BERT, integrated into Whirlpool ovens for personalized recipe recommendations, complemented by a cross-platform app and data dashboard, achieving 92% accuracy through user-driven testing and ML optimization.',
    },
    {
      title: 'Student Accountant',
      company: 'MSU Business and Financial Services',
      website: 'https://sle.msu.edu/',
      duration: 'June 2022 - Jan 2023',
      description: 'Demonstrated strong problem-solving skills in financial markets through accurate data entry, computing, filing, and managing accounting tasks, including operating statements and reconciliations.',
    },
    {
      title: 'Teaching Assistant & Tutor',
      company: 'MSU',
      website: 'https://msu.edu/',
      duration: 'Aug 2021 - Jan 2023',
      description: 'Guided students as a Teaching Assistant and Tutor for courses across computer science, accounting, and economics, leading classes of 70+ students and mentoring over 15 students to achieve a perfect 4.0 GPA.',
    },
    {
      title: 'Service Center Representative',
      company: 'MSU',
      website: 'https://sle.msu.edu/',
      duration: 'May 2023- Present',
      description: 'Delivered exceptional customer service to residence hall students and visitors.',
    },
  ];

  return (
<section className="p-8">
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
            <p className="mt-4 leading-8 duration-150 text-zinc-400">
            <a href={experience.website} target="_blank" rel="noopener noreferrer" className="relative text-zinc-400 inline-block  after:bg-zinc-400 after:absolute after:h-[1px] after:w-0 after:bottom-[1px] after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"> {experience.company} </a> | {experience.duration}
            </p>
            <p className="mt-4 leading-8 duration-150 text-zinc-400">{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
