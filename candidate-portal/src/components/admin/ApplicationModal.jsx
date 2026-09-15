function ApplicationModal({ application, onClose }) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[700px] max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Application Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="font-semibold">Full Name</p>
            <p>{application.fullName}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{application.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone</p>
            <p>{application.phone}</p>
          </div>

          <div>
            <p className="font-semibold">Location</p>
            <p>{application.location}</p>
          </div>

          <div>
            <p className="font-semibold">Experience</p>
            <p>{application.experience}</p>
          </div>

          <div>
            <p className="font-semibold">Current CTC</p>
            <p>{application.currentCTC}</p>
          </div>

          <div>
            <p className="font-semibold">Expected CTC</p>
            <p>{application.expectedCTC}</p>
          </div>

          <div>
            <p className="font-semibold">Notice Period</p>
            <p>{application.noticePeriod}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Portfolio</p>

            <a
              href={application.portfolio}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {application.portfolio}
            </a>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">LinkedIn</p>

            <a
              href={application.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {application.linkedin}
            </a>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">GitHub</p>

            <a
              href={application.github}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              {application.github}
            </a>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Cover Letter</p>

            <p className="bg-gray-100 p-3 rounded">
              {application.coverLetter || "No Cover Letter"}
            </p>
          </div>

        </div>

        <div className="mt-6 flex justify-end">

          <a
            href={`http://localhost:5000/${application.resume}`}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            View Resume
          </a>

        </div>

      </div>

    </div>
  );
}

export default ApplicationModal;