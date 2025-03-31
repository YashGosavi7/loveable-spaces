
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

const teamData: TeamMember[] = [
  {
    id: "dalaram-suthar",
    name: "Dalaram Suthar",
    title: "Founder & Principal Designer",
    bio: "Passionate about creating spaces that evoke warmth and connection, Dalaram founded Loveable in 2012 after working with leading design firms across Europe and Asia.",
    image: "https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg"
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    title: "Creative Director",
    bio: "With a background in fine arts and architecture, Priya brings a unique perspective to each project, blending functionality with artistic expression.",
    image: "https://images.pexels.com/photos/4064834/pexels-photo-4064834.jpeg"
  },
  {
    id: "raj-mehta",
    name: "Raj Mehta",
    title: "Technical Director",
    bio: "Raj ensures that every beautiful design is also structurally sound and feasible, bringing over 15 years of technical expertise to the team.",
    image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg"
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    title: "Project Manager",
    bio: "Aisha's meticulous attention to detail ensures that every project is delivered on time and exceeds client expectations.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
  }
];

export default teamData;
