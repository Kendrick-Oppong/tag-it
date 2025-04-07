import {
  Lightbulb,
  Search,
  Users,
  Tags,
  MousePointerClick,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: <Lightbulb size={42} />,
    title: "AI-Powered Suggestions",
    description:
      "Unlock brilliant bookmark ideas tailored to your habits, powered by cutting-edge machine learning.",
  },
  {
    icon: <Search size={42} />,
    title: "Lightning Search",
    description:
      "Find anything instantly with full-text search—titles, URLs, or notes.",
  },
  {
    icon: <Users size={42} />,
    title: "Team Collections",
    description:
      "Build shared link hubs with friends or teams, synced and collaborative in real time.",
  },
  {
    icon: <Tags size={42} />,
    title: "Smart Tagging",
    description:
      "Let auto-tagging do the heavy lifting using metadata—tweak and refine with ease.",
  },
  {
    icon: <MousePointerClick size={42} />,
    title: "Drag & Drop Magic",
    description:
      "Sort your links into folders or collections with seamless, intuitive drag-and-drop.",
  },
  {
    icon: <Clock size={42} />,
    title: "Timed Revisits",
    description:
      "Schedule reminders to dive back into links, articles, or tutorials when it suits you.",
  },
];

export default function FeaturesComponent() {
  return (
    <section id="features" className="py-20 px-4 md:px-10 bg-muted/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold  mb-6">
          Built for Velocity
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Everything you’d expect—and much more. <br /> Your personal internet
          command center.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 border border-border bg-card hover:bg-card/80 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-5 mx-auto w-fit">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
