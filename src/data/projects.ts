import projectList from './projects.json';

// Array order is the display order on the portfolio and homepage.
export const projects = projectList;
export type Project = (typeof projectList)[number];
