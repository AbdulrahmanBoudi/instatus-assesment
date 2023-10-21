export interface Events {
  id: string;
  object: string;
  actor_id: string;
  group: string;
  action_id: string;
  target_id: string | null;
  location: string;
  occured_at: Date | null;
  metadata_id: string;
  actor_name: string;
  target_name: string;
  email: string;
  action_name: string;
}
