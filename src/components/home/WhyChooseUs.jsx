import {
  FaBriefcase,
  FaUserCheck,
  FaBuilding,
  FaRocket,
} from "react-icons/fa";

import "../../styles/home/whyChooseUs.css";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaBriefcase />,
      title: "Thousands of Jobs",
      description:
        "Explore verified job opportunities from top companies across multiple industries.",
    },
    {
      icon: <FaBuilding />,
      title: "Top Companies",
      description:
        "Connect with leading startups, MNCs, and organizations hiring talented professionals.",
    },
    {
      icon: <FaUserCheck />,
      title: "Easy Applications",
      description:
        "Apply for jobs in just a few clicks using your profile and uploaded resume.",
    },
    {
      icon: <FaRocket />,
      title: "Career Growth",
      description:
        "Track applications, save jobs, and build your career with confidence.",
    },
  ];

  return (
    <section className="why-choose">
      <div className="container">
        <div className="why-header">
          <h2>Why Choose Our Job Portal?</h2>

          <p>
            We make finding your dream job simple, fast, and reliable.
          </p>
        </div>

        <div className="why-grid">
          {features.map((feature, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;