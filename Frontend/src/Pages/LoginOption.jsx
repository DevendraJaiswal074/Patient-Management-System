import { Link } from "react-router-dom";

const LoginOption = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full opacity-15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Floating medical icons background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🏥</div>
        <div className="absolute top-40 right-32 text-5xl">💊</div>
        <div className="absolute bottom-32 left-40 text-5xl">🩺</div>
        <div className="absolute bottom-20 right-20 text-6xl">❤️</div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-5xl mx-4 flex rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 border border-white/10">
        
        {/* Left Panel - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-12 flex-col justify-between relative overflow-hidden">
          
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            {/* Hospital Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PMSCare</h1>
                <p className="text-blue-200 text-sm">Hospital Management</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Streamline Your<br/>Healthcare Practice
            </h2>
            <p className="text-blue-100 text-lg">
              Manage patients, appointments, and medical records all in one place.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>Secure Patient Data Management</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>24/7 Access Anywhere</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span>Multi-user Role Access</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Options */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">PMSCare</span>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Select your role to continue</p>
          </div>

          {/* Role Selection Cards */}
          <div className="space-y-4">
            
            {/* Doctor Card */}
            <Link to="/doctor-login" className="group block">
              <div className="relative p-6 rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">Doctor</h3>
                    <p className="text-sm text-gray-500">Access patient records & consultations</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Staff Card */}
            <Link to="/staff-login" className="group block">
              <div className="relative p-6 rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Staff</h3>
                    <p className="text-sm text-gray-500">Manage appointments & administration</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Admin Card (Optional) */}
            <Link to="/admin-login" className="group block">
              <div className="relative p-6 rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-100 transition-colors"></div>
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Admin</h3>
                    <p className="text-sm text-gray-500">System settings & user management</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>

          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Secured with 256-bit encryption
            </p>
            <p className="text-xs text-gray-300 mt-2">
              © 2026 PMSCare Hospital Management System
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginOption;
