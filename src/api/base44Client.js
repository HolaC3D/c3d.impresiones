/* eslint-disable */
// @ts-nocheck
import { supabase } from "@/lib/supabaseClient";

const PRODUCT_TABLE = "products";
const CATEGORY_TABLE = "categories";
const PRODUCT_IMAGES_BUCKET = "product-images";

const mapOrder = (query, orderBy) => {
  if (!orderBy) return query;
  const ascending = !orderBy.startsWith("-");
  const column = orderBy.replace(/^-/, "");
  return query.order(column, { ascending });
};

const applyEqFilters = (query, filters = {}) => {
  let q = query;
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      q = q.in(key, value);
    } else {
      q = q.eq(key, value);
    }
  });
  return q;
};

const makeEntityApi = (tableName) => ({
  async list(orderBy) {
    let query = supabase.from(tableName).select("*");
    query = mapOrder(query, orderBy);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async filter(filters = {}, orderBy, limit) {
    let query = supabase.from(tableName).select("*");
    query = applyEqFilters(query, filters);
    query = mapOrder(query, orderBy);
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async create(payload) {
    const { data, error } = await supabase
      .from(tableName)
      .insert(payload)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from(tableName)
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;
    return { success: true };
  },
});

const auth = {
  async loginViaEmailPassword(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async register({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  async verifyOtp({ email, otpCode }) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "email",
    });
    if (error) throw error;
    return {
      ...data,
      access_token: data?.session?.access_token,
    };
  },

  async resendOtp(email) {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) throw error;
    return data;
  },

  async loginWithProvider(provider, redirectTo = "/") {
    const providerMap = { google: "google" };
    const mappedProvider = providerMap[provider] || provider;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: mappedProvider,
      options: { redirectTo: `${window.location.origin}${redirectTo}` },
    });
    if (error) throw error;
    return data;
  },

  async me() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user || null;
  },

  async isAuthenticated() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!data?.session;
  },

  async logout(redirectTo) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    if (redirectTo) window.location.href = redirectTo;
  },

  redirectToLogin(returnTo) {
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const safeFrom = returnTo && returnTo !== window.location.href ? returnTo : currentPath;

    const loginPath = "/login";
    if (window.location.pathname === loginPath) return;

    const target = `${loginPath}${safeFrom ? `?from=${encodeURIComponent(safeFrom)}` : ""}`;
    window.location.replace(target);
  },

  async resetPasswordRequest(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return data;
  },

  async resetPassword({ newPassword }) {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  },

  setToken() {
    return;
  },
};

const integrations = {
  Core: {
    async UploadFile({ file }) {
      const extension = file?.name?.split(".").pop() || "bin";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);
      return { file_url: data.publicUrl };
    },
  },
};

export const base44 = {
  auth,
  entities: {
    Product: makeEntityApi(PRODUCT_TABLE),
    Category: makeEntityApi(CATEGORY_TABLE),
  },
  integrations,
};
