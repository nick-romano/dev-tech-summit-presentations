/**
 * A component that colors text from a set of predefined colors
 *
 * @example <colored-text color="green">This is three words</colored-text>
 */
class ColoredText extends HTMLElement {
    /**
    * The color of the word count text
    * @example "green"
    */
    color: "blue" | "green" | "yellow" = "green";

    static observedAttributes = ["color"];

    constructor() {
        // Always call super first in constructor
        super();
    }
}

customElements.define('colored-text', ColoredText);

export { ColoredText };