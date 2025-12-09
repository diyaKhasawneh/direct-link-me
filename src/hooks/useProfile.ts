import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  name: string;
  tagline: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  profile_id: string | null;
  label: string;
  url: string;
  icon: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string;
}

export interface SocialLink {
  id: string;
  profile_id: string | null;
  platform: string;
  url: string;
  is_active: boolean | null;
  sort_order: number | null;
}

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });
};

export const useLinks = (profileId?: string) => {
  return useQuery({
    queryKey: ["links", profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Link[];
    },
    enabled: true,
  });
};

export const useSocialLinks = (profileId?: string) => {
  return useQuery({
    queryKey: ["social_links", profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_links")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as SocialLink[];
    },
    enabled: true,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Partial<Profile> & { id: string }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", profile.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Omit<Link, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("links")
        .insert(link)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useUpdateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Partial<Link> & { id: string }) => {
      const { data, error } = await supabase
        .from("links")
        .update(link)
        .eq("id", link.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Omit<SocialLink, "id">) => {
      const { data, error } = await supabase
        .from("social_links")
        .insert(link)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Partial<SocialLink> & { id: string }) => {
      const { data, error } = await supabase
        .from("social_links")
        .update(link)
        .eq("id", link.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("social_links").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social_links"] });
    },
  });
};

export const uploadAvatar = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `avatar-${Date.now()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
  return data.publicUrl;
};
