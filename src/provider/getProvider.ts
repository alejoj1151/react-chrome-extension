import Provider from './Provider';
import search_increment from './search_increment';
import search_decrement from './search_decrement';
import search_automatic from './search_automatic';

export default function getProvider(): Provider {
    return {
        search_increment: search_increment,
        search_decrement: search_decrement,
        search_automatic: search_automatic,
    };
}
