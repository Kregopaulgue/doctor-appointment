describe('TagModule', () => {
    it("@model.Tag - creates tag", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Tag - deletes tag", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Tag, @model.Project - assign tag to a project", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Tag, @model.Project - remove tag from a project", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Tag, @model.File - assign tag to a file", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it("@model.Tag, @model.File - remove tag from a file", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });

    it(":tag, @model.File - search files with a tg (500ms limit 1/20)", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
    it(":tag, @model.Project - search projects with a tg (500ms limit 1/20)", () => {
        const tags = ['project1', 'project2'];
        const resultProjects = []
        expect(resultProjects.length).toBe(0);
    });
});