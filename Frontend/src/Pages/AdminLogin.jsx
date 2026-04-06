import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    twoFactorCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: credentials, 2: 2FA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      navigate("/admin-dashboard")
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(139,92,246,0.03)_1px,transparent_1px),linear-linear(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
        
        {/* linear Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-violet-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Security Lines Animation */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-purple-500 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-pink-500 to-transparent animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-600 via-violet-600 to-pink-600 rounded-3xl mb-4 shadow-2xl shadow-purple-500/30 relative">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-600 to-pink-600 blur-xl opacity-50 -z-10"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">PMSCare Hospital Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl">
          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-purple-500/10 rounded-full border border-purple-500/20 mx-auto w-fit">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-purple-300 font-medium">SECURE CONNECTION</span>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'} font-semibold text-sm`}>
              1
            </div>
            <div className={`w-16 h-1 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-slate-700'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'} font-semibold text-sm`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Admin Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white placeholder-slate-500"
                      placeholder="admin_username"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white placeholder-slate-500"
                      placeholder="••••••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-slate-500 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-slate-500 hover:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 2FA Code */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-400">Enter the 6-digit code from your authenticator app</p>
                </div>

                <div>
                  <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="w-12 h-14 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-white text-center text-xl font-semibold"
                        onInput={(e) => {
                          const value = e.target.value;
                          if (value && e.target.nextSibling) {
                            e.target.nextSibling.focus();
                          }
                          const inputs = e.target.parentElement.querySelectorAll('input');
                          let code = '';
                          inputs.forEach(input => code += input.value);
                          setFormData(prev => ({ ...prev, twoFactorCode: code }));
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Back to credentials
                </button>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 bg-linear-to-r from-purple-600 via-violet-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:via-violet-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {step === 1 ? 'Continue' : 'Verify & Login'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </form>

          {/* Additional Security Options */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2.5 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
                Recovery Key
              </button>
              <button className="py-2.5 px-4 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-300 text-sm font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                IT Support
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-400 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to role selection
          </Link>
        </div>

        {/* Security Features */}
        <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-xs">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <span>AES-256</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>2FA Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <span>Audit Logged</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          © 2025-26 PMS. All Rights Reserved. • Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
