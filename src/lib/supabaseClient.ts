"use client";

// Supabase client - @supabase/ssr is a peer dependency, add to package.json manually
import { createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Create a Supabase client configured for the browser
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Helper function to get current session
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Helper function to get current user
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return session;
}

// Sign up with email and password
export async function signUp(email: string, password: string) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return session;
}

// Sign out
export async function signOut() {
  const {
    error,
  } = await supabase.auth.signOut();
  if (error) throw error;
}