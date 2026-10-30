"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export function ContactForm() {
 const [status, setStatus] = useState("");
 function submit(event) { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; setStatus("Your message is ready. Message delivery will be available once a contact service is configured."); event.currentTarget.reset(); }
 return <form className="site-form" onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required minLength={2}/></label><label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Subject<input name="subject" required minLength={3}/></label><label>Your message<textarea name="message" rows={5} required minLength={10}/></label><button className="button button-dark" type="submit">SEND A NOTE <ArrowRight size={15}/></button>{status && <p className="form-status" role="status">{status}</p>}</form>;
}

export function AccountForm({ mode }) {
 const isLogin = mode === "login"; const isRegister = mode === "register"; const isReset = mode === "forgot-password";
 const [showPassword, setShowPassword] = useState(false); const [status, setStatus] = useState("");
 function submit(event) {
   event.preventDefault(); const form = event.currentTarget;
   if (!form.reportValidity()) return;
   const data = new FormData(form);
   if (isRegister && data.get("password") !== data.get("confirmPassword")) { setStatus("Those passwords do not match. Please check them and try again."); return; }
   setStatus(isReset ? "Your reset request is ready. Password-reset email delivery requires an authentication service." : "This account flow is ready for an authentication provider. No credentials have been sent or stored.");
 }
 return <form className="site-form account-form" onSubmit={submit}>
   {isRegister && <label>Full name<input name="name" autoComplete="name" required minLength={2}/></label>}
   <label>Email address<input type="email" name="email" autoComplete="email" required/></label>
   {!isReset && <><label>Password<span className="password-input"><input name="password" type={showPassword ? "text" : "password"} autoComplete={isLogin ? "current-password" : "new-password"} minLength={8} required/><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span></label>
    {isRegister && <label>Confirm password<input name="confirmPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required/></label>}
   </>}
   {isLogin && <div className="form-options"><label className="check-label"><input type="checkbox" name="remember"/> Remember me</label><Link href="/forgot-password">Forgot password?</Link></div>}
   {isRegister && <label className="check-label terms-check"><input type="checkbox" name="terms" required/> I agree to the terms and privacy policy.</label>}
   <button className="button button-dark form-submit" type="submit">{isLogin ? "LOG IN" : isRegister ? "CREATE ACCOUNT" : "SEND RESET LINK"} <ArrowRight size={15}/></button>
   {status && <p className="form-status" role="status">{status}</p>}
   <p className="form-switch">{isLogin ? <>New to Velvet? <Link href="/register">Create an account</Link></> : isRegister ? <>Already have an account? <Link href="/login">Log in</Link></> : <>Remembered your password? <Link href="/login">Back to log in</Link></>}</p>
  </form>;
}
