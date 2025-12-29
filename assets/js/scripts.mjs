import { ENV } from "./env.mjs";

class DeployMultiBranches {
    constructor() {
        this.ENV = ENV;
        this.PAGE_DATA = {};
        this.VERSION = "";
        this.TITLE = "";

        this.init();
    }

    async init() {
        // fetch data
        await this.fetchData();

        this.TITLE = this.ENV === "PRD" ? `${this.PAGE_DATA.title}` : `(${this.ENV}) ${this.PAGE_DATA.title}`;

        // set title
        window.document.title = this.TITLE;
        // set footer
        const FOOTER = document.getElementById("footer");
        FOOTER.innerHTML = `by ${this.PAGE_DATA.author}, <a href="https://${this.PAGE_DATA.site}" target="_blank">${this.PAGE_DATA.site}</a> ${this.PAGE_DATA.cite}`;
        // set version
        const VERSION = document.getElementById("version");
        VERSION.innerHTML = this.VERSION;
    }

    async fetchData() {
        await fetch("./assets/data/data.json")
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((data) => {
                this.PAGE_DATA = data.general;
                this.VERSION = data.version;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

const multiBranches = new DeployMultiBranches();
