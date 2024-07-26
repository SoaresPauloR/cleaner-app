import { EventsPost } from './EventsPost';

export type PostProps = {
  post: EventsPost;
  setPost: React.Dispatch<React.SetStateAction<EventsPost>>;
  required: boolean;
};
