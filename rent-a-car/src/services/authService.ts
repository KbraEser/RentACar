import { supabase } from "../lib/supabaseClient";
import type { User, Session } from "@supabase/supabase-js";

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  surname: string;
  passwordConfirm: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

// Kullanıcı kayıt işlemi
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const { email, password, name, surname } = data;

  // 1. Supabase Auth'a kaydet
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
      },
    },
  });

  if (error) throw error;

  // 2. Kullanıcı onaylandıktan sonra users tablosuna ekle
  if (authData.user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: authData.user.id,
      name,
      surname,
    });

    if (insertError) throw insertError;
  }

  return authData;
};

// Kullanıcı giriş işlemi
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return authData;
};

// Kullanıcı çıkış işlemi
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Mevcut oturumu getir
export const getSession = async (): Promise<{ session: Session | null }> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data;
};

// Kullanıcı bilgilerini getir
export const getUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};
