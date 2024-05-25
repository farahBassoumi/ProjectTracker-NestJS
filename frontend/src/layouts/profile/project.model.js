class Project {
    /**
     * Creates a new Project.
     * @param {number} id
     * @param {string} name
     * @param {string} description
     * @param {Date} startDate
     */
    constructor(id, name, description, startDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
    }
}
export default Project;
