/**
 * Film interface
 */
export default interface Film {
    title: string;
    episode_id: Number;
    opening_crawl: String;
    director: String;
    producer: String;
    release_date: Date;
    characters: Array<String>;
    planets: Array<String>;
    starships: Array<String>;
    vehicles: Array<String>;
    species: Array<String>;
    url: String;
}