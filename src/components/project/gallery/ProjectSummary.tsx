
import { Project } from "@/data/projectsData";

interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary = ({ project }: ProjectSummaryProps) => {
  return (
    <div className="mt-12 p-6 bg-lightGray/5 border border-roseGold/5 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-darkGray/80">
            <span className="font-medium text-darkGray">Location:</span> {project.location}
          </p>
          <p className="text-darkGray/80">
            <span className="font-medium text-darkGray">Category:</span> {project.category}
          </p>
          {project.designer && (
            <p className="text-darkGray/80">
              <span className="font-medium text-darkGray">Designer:</span> {project.designer}
            </p>
          )}
          {project.area && (
            <p className="text-darkGray/80">
              <span className="font-medium text-darkGray">Area:</span> {project.area}
            </p>
          )}
        </div>
        <div>
          {project.completionDate && (
            <p className="text-darkGray/80">
              <span className="font-medium text-darkGray">Completed:</span> {project.completionDate}
            </p>
          )}
          {project.budget && (
            <p className="text-darkGray/80">
              <span className="font-medium text-darkGray">Budget:</span> {project.budget}
            </p>
          )}
          {project.client && (
            <p className="text-darkGray/80">
              <span className="font-medium text-darkGray">Client:</span> {project.client}
            </p>
          )}
        </div>
      </div>
      {project.tagline && (
        <p className="text-roseGold italic mt-4">{project.tagline}</p>
      )}
    </div>
  );
};

export default ProjectSummary;
