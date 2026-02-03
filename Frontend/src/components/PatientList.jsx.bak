const patients = [
  { id: 1, name: "Chandan Chaudhary", phone: "012-248-53798" },
  { id: 2, name: "Deepanshu Yadav", phone: "012-245-53789" },
  { id: 3, name: "Devendra Jaiswal", phone: "012-245-63789" },
  { id: 4, name: "Divyansh Chakravarty", phone: "012-245-53789" },
  { id: 5, name: "Suresh Agarwal", phone: "012-245-63789" },
  { id: 6, name: "Anu Patel", phone: "012-245-66789" },
  { id: 7, name: "Manoj Tiwari", phone: "012-245-65789" },
  { id: 8, name: "Pooja Das", phone: "012-245-65789" },
  { id: 9, name: "Vikash Yadav", phone: "012-245-66789" },
  { id: 10, name: "Sneha Rao", phone: "012-245-66789" },
];

const PatientList = () => {
  return (
    <div className="bg-white shadow border border-black/30 rounded">

      <div className="text-center px-4 py-2 border-b border-black/30 rounded font-bold text-xl text-gray-700">
        Today’s Patient List
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-black/30 rounded">
          <tr>
            <th className="px-4 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Patient Name</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {patients.map((p, i) => (
            <tr key={p.id}>
              <td className="px-4 py-3">{i + 1}.</td>

              <td className="px-4 py-2 flex items-center gap-2">
                <div className="w-5 h-5 bg-sky-500 rounded-full"></div>
                {p.name}
              </td>

              <td className="px-4 py-2">{p.phone}</td>

              <td className="px-4 py-2">
                <button className="bg-green-500 text-white text-xs px-2 py-1 rounded pointer-events-auto">
                  Checked In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default PatientList;