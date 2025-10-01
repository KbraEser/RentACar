import { supabase } from "../lib/supabaseClient";
import type { User, Session } from "@supabase/supabase-js";
import { handleError, validateInput } from "../utils/errorHandler";

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
  // Input validation
  validateInput(data.email, "Email");
  validateInput(data.password, "Şifre");
  validateInput(data.name, "Ad");
  validateInput(data.surname, "Soyad");

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

  if (error) {
    throw new Error(handleError(error, "AuthService.signUp"));
  }

  // 2. Kullanıcı onaylandıktan sonra users tablosuna ekle
  if (authData.user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: authData.user.id,
      name,
      surname,
      email,
    });

    if (insertError) {
      throw new Error(
        handleError(insertError, "AuthService.signUp - User Insert")
      );
    }
  }

  return authData;
};

// Kullanıcı giriş işlemi
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  // Input validation
  validateInput(data.email, "Email");
  validateInput(data.password, "Şifre");

  const { email, password } = data;

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(handleError(error, "AuthService.signIn"));
  }

  return authData;
};

// Kullanıcı çıkış işlemi
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(handleError(error, "AuthService.signOut"));
  }
};

// Mevcut oturumu getir
export const getSession = async (): Promise<{ session: Session | null }> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(handleError(error, "AuthService.getSession"));
  }
  return data;
};

// Kullanıcı bilgilerini getir
export const getUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw new Error(handleError(error, "AuthService.getUser"));
  }
  return user;
};
