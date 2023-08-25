export interface PodcastModel {
    id: number;
    user_id: number;
    title: string;
    author: string;
    language: string;
    category_name: string;
    category_type: string;
    picture_url: string;
    description: string;
    explicit: string;
    created_at: string;
    updated_at: string;
    tips_and_donations_activated: string;
    tips_and_donations_amount: string;
    email: string;
    episode_count: string;
    play_count: string;
    rating_count: string;
    average_rating: string;
}

export interface PodcastGoal {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}