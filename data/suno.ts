const BASE_URL = "https://studio-api.suno.ai/api";

export const sunoRequest = async (id: string) =>
  fetch(`${BASE_URL}/playlist/${id}/?page=0`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

export interface SunoResponse {
  id: string;
  playlist_clips: PlaylistClip[];
  image_url: string;
  num_total_results: number;
  current_page: number;
  is_owned: boolean;
  is_trashed: boolean;
  is_public: boolean;
  user_display_name: string | null;
  user_handle: string | null;
  reaction: any;
  name: string;
  description: string;
  is_discover_playlist: boolean;
}

export interface PlaylistClip {
  clip: Clip;
  relative_index: number;
}

export interface Clip {
  id: string;
  video_url: string;
  audio_url: string;
  image_url: string;
  image_large_url: string;
  is_video_pending: boolean;
  major_model_version: MajorModelVersion;
  model_name: ModelName;
  metadata: Metadata;
  is_liked: boolean;
  user_id: string;
  display_name: string;
  handle: string;
  is_handle_updated: boolean;
  is_trashed: boolean;
  reaction: any;
  created_at: Date;
  status: Status;
  title: string;
  play_count: number;
  upvote_count: number;
  is_public: boolean;
}

export enum MajorModelVersion {
  V3 = "v3",
}

export interface Metadata {
  tags: string;
  prompt: string;
  gpt_description_prompt: any;
  audio_prompt_id: any;
  history: any;
  concat_history: ConcatHistory[];
  type: Type;
  duration?: number;
  refund_credits: any;
  stream: any;
  error_type: string | null;
  error_message: string | null;
}

export interface ConcatHistory {
  id: string;
  continue_at: number | null;
}

export enum Type {
  Concat = "concat",
}

export enum ModelName {
  ChirpV3 = "chirp-v3",
}

export enum Status {
  Complete = "complete",
}

export const sunoList = [
  {
    id: "1190bf92-10dc-4ce5-968a-7a377f37f984",
    name: "Explore",
    description: "Top 10 Songs",
  },
  {
    id: "08a079b2-a63b-4f9c-9f29-de3c1864ddef",
    name: "",
    description: "Top Weekly",
  },
  {
    id: "845539aa-2a39-4cf5-b4ae-16d3fe159a77",
    name: "",
    description: "Top Monthly",
  },
  {
    id: "6943c7ee-cbc5-4f72-bc4e-f3371a8be9d5",
    name: "",
    description: "Top All-Time",
  },
  {
    id: "1ac7823f-8faf-474f-b14c-e4f7c7bb373f",
    name: "Animal Party",
    description: "",
  },
  {
    id: "636ed6cb-da70-4123-9ea1-fab61d0165cb",
    name: "Suno Showcase",
    description: "",
  },
  {
    id: "6713d315-3541-460d-8788-162cce241336",
    name: "lo fi",
    description: "",
  },
  {
    id: "cc14084a-2622-4c4b-8258-1f6b4b4f54b3",
    name: "New",
    description: "New Songs",
  },
  {
    id: "22890199-d98d-47d5-bad6-464012c229fb",
    name: "Blues",
    description:
      "my woman left me, my dog left me, my truck left me, my gpu left me, &c",
  },
  {
    id: "5e16f8be-9ece-4d88-8b10-d921fd93b4a2",
    name: "Funk",
    description: "funky implies the existence of funvalue",
  },
  {
    id: "f0f4964c-5219-47e8-820f-1923c989a3a4",
    name: "Hip Hop",
    description: "rapped attention",
  },
  {
    id: "5e4ccae6-8918-4e6b-9847-d9caa8245ab9",
    name: "Pop",
    description: "O(1) time access to groove",
  },
  {
    id: "8c8838f4-0498-4f7d-ad36-0c7e7fb1804a",
    name: "Classical",
    description:
      "What you’re referring to as Classical Music, is in fact, GNU/Common Practice Period Music, or as I’ve recently taken to calling it, GNU plus Common Practice Period Music.",
  },
  {
    id: "68214995-3aa0-4b56-8a54-9fed1f0d33be",
    name: "Instrumentals",
    description: "instrumental rationality",
  },
  {
    id: "db541518-752d-4d44-9248-6563db3e8729",
    name: "Jazz",
    description: "🎵 defgecd",
  },
  {
    id: "37860817-823e-4496-8918-9d028015818f",
    name: "Metal",
    description: "INDIFFERENCE TO BRUTALITY 🤘",
  },
  {
    id: "58ab1d3f-da82-434f-8020-ce87a6261a06",
    name: "Rock",
    description: "& reroll",
  },
  {
    id: "4d818eb5-2f99-4dc9-87bc-34b0620484f4",
    name: "EDM",
    description: "slide into my EDMs",
  },
  {
    id: "8cb18d24-cf3b-44d8-804c-4c243d53df6f",
    name: "Gnawa",
    description: "gnawawave",
  },
  {
    id: "59bca9be-3802-43fc-af44-7e96a05cfe22",
    name: "Russian Roots Reggae",
    description: "rootskies",
  },
  {
    id: "abcb42fa-d66a-42ab-bdae-ff8a776290ac",
    name: "Korean Opera",
    description: "bibimbops",
  },
  {
    id: "48db22ee-6e57-49dc-abd6-59fb174b09fa",
    name: "Urdu Jazzwave",
    description: "ride the jazzwave",
  },
  {
    id: "25b2aef3-66b8-470d-90e8-5620275111aa",
    name: "French Dubstep",
    description: "étape de doublage",
  },
];
