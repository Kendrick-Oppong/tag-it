import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    testimonial: "The AI suggestions are spot-on, saving me time daily.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    testimonial:
      "This tool’s tagging and search features are a game-changer for research.",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    testimonial:
      " The drag-and-drop organization and clean interface make this an indispensable part of my workflow.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    testimonial:
      "Managing campaign resources has never been this seamless or efficient.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    testimonial:
      "Smart tagging and revisit reminders keep my projects on track—worth every penny.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    testimonial:
      "The intuitive design and team features have streamlined our entire process.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const TestimonialComponent = () => (
  <section id="testimonial" className="pb-20 px-4 bg-muted/5">
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-12">What Users Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col bg-card outline outline-border p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Stars */}
            <div className="flex items-center justify-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 fill-yellow-400 stroke-yellow-400"
                  />
                ))}
            </div>
            {/* Testimonial Text */}
            <p className="text-base text-muted-foreground italic text-center my-3 leading-relaxed">
              “{testimonial.testimonial}”
            </p>
            {/* User Info */}
            <div className="mt-auto flex items-center justify-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="text-lg font-medium bg-primary text-primary-foreground">
                  {testimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-primary">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialComponent;
