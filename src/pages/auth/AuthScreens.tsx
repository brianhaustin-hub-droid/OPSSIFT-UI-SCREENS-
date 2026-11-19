import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  MailCheck,
  RefreshCw,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { OppSiftLogo } from '../../components/brand/OppSiftLogo';
import { CinematicVideoBackdrop } from '../../components/media/CinematicVideoBackdrop';
import { useAppState } from '../../context/AppStateContext';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { AuthScreenMode } from '../../types/oppsift';

export function AuthScreensPage() {
  const { path, navigate } = useRouter();
  const { setIsSignedIn, pushToast } = useAppState();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [mode, setMode] = useState<AuthScreenMode>('login');

  useEffect(() => {
    setFormFeedback('');
    if (path === '/auth/register') setMode('register');
    else if (path === '/auth/forgot-password') setMode('forgot-password');
    else if (path === '/auth/reset-password') setMode('reset-password');
    else if (path === '/auth/resend-verification') setMode('resend-verification');
    else if (path === '/auth/invitation') setMode('invitation-sign-in');
    else setMode('login');
  }, [path]);
  const [email, setEmail] = useState('e.vance@meridian-advisory.org');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [formFeedback, setFormFeedback] = useState<string>('');

  const handleNeonLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setFormFeedback('Enter a valid work email and password (minimum 6 characters).');
      return;
    }
    setFormFeedback('');
    setIsSignedIn(true);
    pushToast('info', 'Neon Managed Auth session activated.');
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes('@') || password.length < 8 || password !== confirmPassword || !acceptedTerms) {
      setFormFeedback('Complete all fields, ensure passwords match (8+ chars), and accept the terms.');
      return;
    }
    setFormFeedback('');
    setMode('email-verification');
  };

  const GoogleOAuthButton = ({ label }: { label: string }) => (
    <button
      type="button"
      onClick={() => {
        pushToast('info', 'Google OAuth via Neon Managed Auth boundary invoked.');
        navigate('/onboarding');
      }}
      className="w-full h-10 px-4 rounded-md border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#1C2433] hover:bg-[#F8FAFC] dark:hover:bg-[#263244]/70 text-sm font-medium text-[#172033] dark:text-[#F8FAFC] flex items-center justify-center gap-2.5 transition-colors"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z" />
        <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z" />
      </svg>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#101114] text-[#172033] dark:text-[#F8FAFC] overflow-x-hidden">
      <div className="border-b border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#171923] px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] dark:text-[#CBD5E1] hover:text-[#172033] dark:hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFormFeedback('');
              setMode(mode === 'register' ? 'login' : 'register');
            }}
            className="px-3 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#263244] text-xs font-medium hover:border-[#A33B59]"
          >
            {mode === 'register' ? 'Sign In' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#263244] text-xs font-medium"
          >
            {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Brand Panel with Cinematic Video Backdrop */}
        <CinematicVideoBackdrop
          playlistIds={['global-cities', 'international-business']}
          overlayTone="burgundy-navy"
          className="lg:col-span-5 flex flex-col justify-between"
          showControls={true}
        >
          <div className="p-8 sm:p-12 flex flex-col justify-between h-full">
            <div>
              <OppSiftLogo variant="dark-bg" size="lg" />
              <h1 className="mt-10 font-display text-3xl font-bold leading-tight text-balance text-white">
                Global opportunity intelligence, backed by verified source provenance.
              </h1>
              <p className="mt-4 text-sm text-[#FFF1F2]/85 leading-relaxed max-w-md">
                Authenticated via Neon Managed Auth and Google OAuth. Access personalised tender matching, eligibility analysis, and team preparation pipelines.
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-white/15 space-y-2 text-xs text-white/85">
              <p>Multi-jurisdiction currency &amp; timezone normalisation</p>
              <p>Clause-cited AI eligibility interpretation</p>
              <p>Role-based organisation workspaces</p>
            </div>
          </div>
        </CinematicVideoBackdrop>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#171923] p-6 sm:p-8 shadow-sm">
            {formFeedback && (
              <div className="mb-4 p-3 rounded-md border border-[#DC2626]/30 bg-[#DC2626]/8 text-xs text-[#DC2626] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formFeedback}</span>
              </div>
            )}

            {mode === 'login' && (
              <form onSubmit={handleNeonLogin} className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold">Sign in to OppSift</h2>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] mt-1">
                    Access your opportunity intelligence workspace.
                  </p>
                </div>
                <GoogleOAuthButton label="Continue with Google" />
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-[#E2E8F0] dark:border-[#263244]" />
                  <span className="px-3 text-[11px] text-[#64748B] dark:text-[#CBD5E1]">or email</span>
                  <div className="flex-grow border-t border-[#E2E8F0] dark:border-[#263244]" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium">Password</label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-xs text-[#164E8B] dark:text-[#38BDF8] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-10 pl-3 pr-10 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#E2E8F0]"
                  />
                  <span>Keep session active on this device</span>
                </label>
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg bg-[#541B32] hover:bg-[#A33B59] text-white text-sm font-semibold transition-colors"
                >
                  Sign In
                </button>
                <p className="text-xs text-center text-[#64748B] dark:text-[#CBD5E1]">
                  New to OppSift?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="font-semibold text-[#541B32] dark:text-[#E8A4B5] hover:underline"
                  >
                    Create an account
                  </button>
                </p>
                <p className="text-[11px] text-center text-[#64748B] dark:text-[#CBD5E1]">
                  By continuing you agree to the Terms of Service and Privacy Notice.
                </p>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold">Create your OppSift account</h2>
                  <p className="text-xs text-[#64748B] dark:text-[#CBD5E1] mt-1">
                    Register with Neon Managed Auth or Google OAuth.
                  </p>
                </div>
                <GoogleOAuthButton label="Sign up with Google" />
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Elena Vance"
                      className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Work Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Password (min 8 characters)</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 pl-3 pr-10 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Confirm Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                    />
                  </div>
                  <label className="flex items-start gap-2 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 rounded"
                    />
                    <span>I accept the OppSift Terms of Service and Privacy Policy.</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg bg-[#541B32] hover:bg-[#A33B59] text-white text-sm font-semibold"
                >
                  Create Account
                </button>
                <p className="text-xs text-center text-[#64748B] dark:text-[#CBD5E1]">
                  Already registered?{' '}
                  <button type="button" onClick={() => setMode('login')} className="font-semibold text-[#541B32] dark:text-[#E8A4B5] hover:underline">
                    Sign in
                  </button>
                </p>
              </form>
            )}

            {mode === 'signup-unavailable' && (
              <div className="space-y-4 text-center py-4">
                <ShieldAlert className="w-10 h-10 mx-auto text-[#D97706]" />
                <h2 className="font-display text-xl font-bold">Public registration currently closed</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  Self-service sign-ups are temporarily restricted for this deployment. Existing members and invited users can continue signing in.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Return to Sign In
                </button>
              </div>
            )}

            {mode === 'forgot-password' && (
              <div className="space-y-4">
                <KeyRound className="w-8 h-8 text-[#541B32] dark:text-[#E8A4B5]" />
                <h2 className="font-display text-xl font-bold">Forgot your password?</h2>
                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  Enter your account email and Neon Managed Auth will send a reset link.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMode('reset-password')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Send Recovery Instructions
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-xs text-[#64748B] hover:underline"
                >
                  Back to Login
                </button>
              </div>
            )}

            {mode === 'reset-password' && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Set a new password</h2>
                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  Choose a strong password of at least 8 characters.
                </p>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    pushToast('success', 'Password reset boundary completed. Ready to sign in.');
                    setMode('login');
                  }}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Update Password
                </button>
              </div>
            )}

            {mode === 'email-verification' && (
              <div className="space-y-4 text-center py-2">
                <MailCheck className="w-10 h-10 mx-auto text-[#164E8B] dark:text-[#38BDF8]" />
                <h2 className="font-display text-xl font-bold">Verify your email address</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  We sent a verification link and 6-digit code to <span className="font-semibold text-[#172033] dark:text-[#F8FAFC]">{email}</span>.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setMode('verification-code')}
                    className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                  >
                    Enter Verification Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('resend-verification')}
                    className="text-xs font-medium text-[#164E8B] dark:text-[#38BDF8] hover:underline"
                  >
                    Didn&apos;t receive the email? Resend
                  </button>
                </div>
              </div>
            )}

            {mode === 'verification-code' && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-bold">Enter 6-digit verification code</h2>
                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  Confirm ownership of {email} to activate your session.
                </p>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="000000"
                  className="w-full h-12 px-4 text-center font-mono text-xl tracking-[0.4em] rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433]"
                />
                <button
                  type="button"
                  onClick={() => navigate('/onboarding')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Verify &amp; Continue to Onboarding
                </button>
              </div>
            )}

            {mode === 'resend-verification' && (
              <div className="space-y-4 text-center py-2">
                <RefreshCw className="w-9 h-9 mx-auto text-[#541B32] dark:text-[#E8A4B5]" />
                <h2 className="font-display text-xl font-bold">Resend verification email</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  Confirm the address below to trigger a fresh verification message from Neon Auth.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#263244] bg-[#F8FAFC] dark:bg-[#1C2433] text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMode('email-verification')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Resend Verification
                </button>
              </div>
            )}

            {mode === 'already-signed-in' && (
              <div className="space-y-4 text-center py-2">
                <UserCheck className="w-10 h-10 mx-auto text-[#16A34A]" />
                <h2 className="font-display text-xl font-bold">Already signed in</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  Active session detected for <span className="font-medium text-[#172033] dark:text-[#F8FAFC]">{email}</span>.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                  >
                    Continue to Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignedIn(false);
                      setMode('login');
                    }}
                    className="w-full h-10 rounded-lg border border-[#E2E8F0] dark:border-[#263244] text-sm font-medium"
                  >
                    Sign out and switch account
                  </button>
                </div>
              </div>
            )}

            {mode === 'auth-not-configured' && (
              <div className="space-y-4 text-center py-2">
                <ShieldAlert className="w-10 h-10 mx-auto text-[#D97706]" />
                <h2 className="font-display text-xl font-bold">Authentication provider not configured</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  Neon Managed Auth environment variables are not bound for this deployment. Contact your platform administrator to configure authentication.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full h-10 rounded-lg border border-[#E2E8F0] dark:border-[#263244] text-sm font-semibold"
                >
                  Return to Homepage
                </button>
              </div>
            )}

            {mode === 'session-loading' && (
              <div className="space-y-4 text-center py-6">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#541B32] border-t-transparent animate-spin" />
                <h2 className="font-display text-lg font-semibold">Checking authentication session…</h2>
                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  Verifying Neon Managed Auth token status.
                </p>
              </div>
            )}

            {mode === 'sign-in-required' && (
              <div className="space-y-4 text-center py-2">
                <Lock className="w-10 h-10 mx-auto text-[#541B32] dark:text-[#E8A4B5]" />
                <h2 className="font-display text-xl font-bold">Sign-in required</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  You must sign in to view protected opportunity pipelines, saved searches, or team settings.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Proceed to Sign In
                </button>
              </div>
            )}

            {mode === 'invitation-sign-in' && (
              <div className="space-y-4">
                <CheckCircle2 className="w-8 h-8 text-[#164E8B] dark:text-[#38BDF8]" />
                <h2 className="font-display text-xl font-bold">Join Meridian Civic &amp; Cloud Advisory</h2>
                <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                  You have been invited as an <span className="font-semibold">Analyst</span>. Sign in with your invited email to accept.
                </p>
                <GoogleOAuthButton label="Accept via Google" />
                <button
                  type="button"
                  onClick={() => setMode('invitation-verification')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Continue with Invited Email
                </button>
              </div>
            )}

            {mode === 'invitation-verification' && (
              <div className="space-y-4 text-center py-2">
                <MailCheck className="w-10 h-10 mx-auto text-[#16A34A]" />
                <h2 className="font-display text-xl font-bold">Verifying organisation invitation</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  Validating token for <span className="font-mono text-xs">{email}</span> before granting workspace role permissions.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/accept-invitation')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Review Invitation Details
                </button>
              </div>
            )}

            {mode === 'auth-error' && (
              <div className="space-y-4 text-center py-2">
                <AlertCircle className="w-10 h-10 mx-auto text-[#DC2626]" />
                <h2 className="font-display text-xl font-bold">Authentication failed</h2>
                <p className="text-sm text-[#64748B] dark:text-[#CBD5E1]">
                  The authentication callback returned an invalid or expired state parameter. No session was created.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full h-10 rounded-lg bg-[#541B32] text-white text-sm font-semibold"
                >
                  Try Signing In Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
