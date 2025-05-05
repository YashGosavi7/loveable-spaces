
import { Project } from "@/data/projectsData";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <section className="py-16 bg-lightGray/5">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl mb-10 text-center">About This Project</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto text-darkGray/90">
            <p className="lead text-xl mb-8">
              {project.description || `${project.title} is a beautiful ${project.category.toLowerCase()} project located in ${project.location}.`}
            </p>
            
            {project.features && project.features.length > 0 && (
              <>
                <h3 className="font-playfair text-2xl mb-4 mt-8">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
            
            {project.challenges && (
              <>
                <h3 className="font-playfair text-2xl mb-4 mt-8">Design Challenges</h3>
                <p>{project.challenges}</p>
              </>
            )}
            
            {project.solutions && (
              <>
                <h3 className="font-playfair text-2xl mb-4 mt-8">Our Approach</h3>
                <p>{project.solutions}</p>
              </>
            )}
            
            {project.materials && project.materials.length > 0 && (
              <>
                <h3 className="font-playfair text-2xl mb-4 mt-8">Materials Used</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {project.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </>
            )}
            
            {project.testimonial && (
              <div className="my-8 p-6 bg-white border-l-4 border-roseGold italic">
                <p className="mb-4">"{project.testimonial.content}"</p>
                <p className="text-right font-medium">— {project.testimonial.author}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-12">
            {project.websiteUrl && (
              <a 
                href={project.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-roseGold hover:bg-roseGold/90 text-white px-6 py-3 rounded-sm mr-4"
              >
                Visit Project Website
              </a>
            )}
            
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 border border-roseGold text-roseGold hover:bg-roseGold/10 px-6 py-3 rounded-sm"
            >
              Inquire About Similar Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
