/**
 * Checks if user is on specific page.
 */
export default function isUserOnPage(pageTitle: string) {
    const title = document.getElementsByClassName('title')[0];
    return title && title.innerHTML === pageTitle;
}
