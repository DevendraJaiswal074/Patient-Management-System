const LoginOption = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-white relative overflow-hidden">
      
      {/* medical soft background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200 rounded-full opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>

      {/* main card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-[430px] px-12 py-14 text-center">
        
        {/* logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shadow">
            M
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Doctor XYZ
          </h1>
          <p className="text-sm text-gray-500">
            Medical & Patient Management System
          </p>
        </div>

        {/* welcome */}
        <h2 className="text-2xl font-medium text-gray-700 mb-10">
          Welcome
        </h2>

        {/* buttons */}
        <div className="space-y-5">
          
          {/* Student Button */}
          <button
            className="w-full py-3 rounded-lg text-lg font-medium text-white
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            transition-all duration-300 ease-in-out
            shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Doctor
          </button>

          {/* Staff Button */}
          <button
            className="w-full py-3 rounded-lg text-lg font-medium text-white
            bg-gradient-to-r from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            transition-all duration-300 ease-in-out
            shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Staff
          </button>

        </div>

        {/* footer */}
        <p className="text-xs text-gray-400 mt-10">
          Secure medical portal for authorized users only
        </p>

      </div>
    </div>
  );
};

export default LoginOption;