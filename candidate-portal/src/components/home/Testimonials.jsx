import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/100?img=11",
    review:
      "CareerHub helped me land my first software job within two weeks. The process was smooth and easy.",
  },
  {
    id: 2,
    name: "Priya Reddy",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/100?img=5",
    review:
      "The UI is beautiful and the job recommendations were highly relevant. I got multiple interview calls.",
  },
  {
    id: 3,
    name: "Karthik Kumar",
    role: "React Developer",
    image: "https://i.pravatar.cc/100?img=15",
    review:
      "One of the best job portals I've used. Clean interface, verified companies, and fast applications.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            What Our Users Say
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Thousands of professionals trust CareerHub to build their careers.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((user) => (
            <div
              key={user.id}
              className="bg-slate-50 rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition"
            >

              <div className="flex items-center gap-4">

                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-lg">
                    {user.name}
                  </h3>

                  <p className="text-gray-500">
                    {user.role}
                  </p>
                </div>

              </div>

              <div className="flex gap-1 mt-6">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="mt-5 text-gray-600 leading-7">
                "{user.review}"
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;