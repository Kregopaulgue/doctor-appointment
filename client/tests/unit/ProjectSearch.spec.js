describe('ProjectSearch', () => {
    it("@model.Project - creates project", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Project - deletes project", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Project - updates project's meta-info", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Project. :tags - Connects tags to the project", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it(":tags - search finds 3 projects out of 10", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = ['project1', 'project1, project2', 'project2, project3']
        expect(resultProjects.length).toBe(3);
    });
    it(":tags - search finds 0 projects out of 10", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
});