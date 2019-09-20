export type Direction = 'up' | 'down';

export default interface Provider {
    search_increment: () => void;
    search_decrement: () => void;
    search_automatic: () => void;
}
