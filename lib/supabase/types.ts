import type {
  AudioTrack,
  BackgroundConfig,
  Badge,
  EntryScreenConfig,
  GlowConfig,
  GradientConfig,
  LayoutSettings,
  MetaConfig,
  ProfileColors,
  ProfileLink,
  Widget,
} from '@/lib/types';

// JSON column shapes. Stored as jsonb; typed here so the app never sees `any`.
export type ProfileRow = {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  description: string | string[] | null;
  location: string | null;
  pronouns: string | null;
  verified: boolean;

  layout: string;
  layout_settings: LayoutSettings | null;

  background: BackgroundConfig | null;
  background_effect: string | null;
  cursor_effect: string | null;
  custom_cursor: string | null;
  profile_effect: string | null;

  colors: ProfileColors | null;
  gradient: GradientConfig | null;
  monochrome_icons: boolean;

  font: string;
  username_effect: string;
  animated_title: boolean;

  typewriter_speed: number;
  typewriter_delete_speed: number;
  typewriter_pause: number;

  links: ProfileLink[];
  link_alignment: string;

  audio: AudioTrack[];
  audio_autoplay: boolean;
  audio_volume: number;

  widgets: Widget[];
  badges: Badge[];

  box_opacity: number;
  box_blur: number;
  glow: GlowConfig | null;
  swap_box_colors: boolean;

  discord_id: string | null;
  show_discord_presence: boolean;
  use_discord_avatar: boolean;

  meta: MetaConfig | null;
  entry_screen: EntryScreenConfig | null;

  created_at: string;
  updated_at: string;
};

export type ProfileInsert = Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'> &
  Partial<Pick<ProfileRow, 'id' | 'created_at' | 'updated_at'>>;
export type ProfileUpdate = Partial<Omit<ProfileRow, 'id' | 'user_id' | 'created_at'>>;

export type AliasRow = {
  id: string;
  profile_id: string;
  alias: string;
  created_at: string;
};

export type ProfileViewRow = {
  id: string;
  profile_id: string;
  viewed_at: string;
  country: string | null;
  device_type: string | null;
  referrer: string | null;
};

export type LinkClickRow = {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  clicked_at: string;
};

export type ReservedUsernameRow = { username: string };

type TableShape<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: TableShape<ProfileRow, ProfileInsert, ProfileUpdate>;
      aliases: TableShape<AliasRow, Omit<AliasRow, 'id' | 'created_at'>, Partial<AliasRow>>;
      profile_views: TableShape<
        ProfileViewRow,
        Omit<ProfileViewRow, 'id' | 'viewed_at'> & Partial<Pick<ProfileViewRow, 'viewed_at'>>,
        Partial<ProfileViewRow>
      >;
      link_clicks: TableShape<
        LinkClickRow,
        Omit<LinkClickRow, 'id' | 'clicked_at'> & Partial<Pick<LinkClickRow, 'clicked_at'>>,
        Partial<LinkClickRow>
      >;
      reserved_usernames: TableShape<ReservedUsernameRow, ReservedUsernameRow, ReservedUsernameRow>;
    };
    Views: Record<string, never>;
    Functions: {
      username_available: {
        Args: { candidate: string };
        Returns: boolean;
      };
      profile_view_count: {
        Args: { p_profile_id: string };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
