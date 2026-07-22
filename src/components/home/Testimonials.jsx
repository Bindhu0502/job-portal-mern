import "../../styles/home/testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rahul",
      role: "Frontend Developer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "This portal helped me land my dream job in just two weeks. The application process was simple and smooth.",
    },
    {
      id: 2,
      name: "Bindhu",
      role: "Data Analyst",
      image: "https://i.pravatar.cc/150?img=32",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "I loved the clean interface and easy job search. The saved jobs feature made tracking opportunities effortless.",
    },
    {
      id: 3,
      name: "Shiva",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=18",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "The best job portal I've used. I received interview calls within days of applying. Highly recommended!",
    },
     {
      id: 4,
      name: "Kavitha",
      role: "UI/UX Designer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "I was able to find multiple job opportunities that matched my skills. The platform is user-friendly and efficient.",
    },
     {
      id: 5,
      name: "Srinivas Reddy",
      role: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "I appreciate the quick response from employers and the variety of job listings available. This portal truly helped me advance my career.",
    },
     {
      id: 6,
      name: "Likhitha",
      role: "Full Stack Developer",
      image: "https://i.pravatar.cc/150?img=12",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "The application process was seamless, and I found a job that perfectly fits my skill set. The support team was also very helpful throughout the process.",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">

        <div className="testimonial-header">
          <h2>What Our Users Say</h2>

          <p>
            Thousands of job seekers trust our platform to build their careers.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <div className="testimonial-card" key={item.id}>

              <div className="testimonial-rating">
                {item.rating}
              </div>

              <p className="testimonial-review">
                "{item.review}"
              </p>

              <div className="testimonial-user">

                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;