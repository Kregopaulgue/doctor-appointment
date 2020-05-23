describe('UserModule', () => {
    it("@model.User - creates user", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.User - authenticates user", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.User - destroys token", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.User, @model.Team - Assign user to a team", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.User - Update profile info", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = ['project1', 'project1, project2', 'project2, project3']
        expect(resultProjects.length).toBe(3);
    });
    it("@model.User - Create project assigned to user", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
});