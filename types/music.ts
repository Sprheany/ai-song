export interface SunoMusic {
  id: string;
  video_url: string;
  audio_url: string;
  image_url: string;
  image_large_url: string;
  is_video_pending: boolean;
  major_model_version: string;
  model_name: string;
  metadata: Metadata;
  is_liked: boolean;
  user_id: string;
  display_name: string;
  handle: string;
  is_handle_updated: boolean;
  is_trashed: boolean;
  created_at: string;
  status: string;
  title: string;
  play_count: number;
  upvote_count: number;
  is_public: boolean;
}

export interface Metadata {
  tags: string;
  prompt: string;
  type: string;
  duration: number;
}

export interface Music {
  id: string;
  name: string;
  artist: string;
  audioUrl: string;
  coverImage: string;
  duration: number;
}
