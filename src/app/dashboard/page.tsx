import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function DashboardPage() {
  const dummySkills = ["Gardening", "Graphic Design", "Childcare"];
  
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dummySkills.map((skill, idx) => (
            <Card
              key={idx}
              title={skill}
              description={`Offering help with ${skill}`}
              tags={["1 hour credit", "Reliable"]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
