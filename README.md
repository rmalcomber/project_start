# project_start
This is a brand new repositry for a commandline tool to rapidly start up a project. It's **NOT** a replacment for tools like [ViteJS](https://vitejs.dev/). Name subject to change. Let's paint a picture. 

Imagine, you're starting a new web service. You know you need some things, a website, a API server, hosting, a database, source control, and project management tooling. That's the ultimate scenaro I want to solve with this application. Choose your schema or design, enter some details and everything is scafolded out for you. 

## Why? 
Good question! I have ADHD/Autism and as a developer I have TB's of half started projects, and for me to be really effective there's a lot of ground work to get a project started, even something as simple as `git init` can really slow the flow and I just want to get to writing code. So as another half started project, I started this......project_start. I was going to name this J.A.R.V.I.S. after the ironman AI, but that's taken by multiple systems and it might've been too on the nose. However I love the following interaction which inspired this project. 

---

 Tony Stark: JARVIS, you up?
 JARVIS: For you, sir, always.

 Tony Stark: I'd like to open a new project file, index as Mark Two.

 JARVIS: Shall I store this on the Stark Industries Central Database?

 Tony Stark: Actually, I don't know who to trust right now. Till further notice, why don't we just keep everything on my private server?

 ---

 ## Goals and features (Roadmap)
 Here are some of the goals I want to hit with this project.

### Schemas
 - Scaffold out a new project based on `schema`
   - Schemas provide a set of instructions for the application to process and execute
   - Schemas contain a series of steps, and optional steps.
   - Currently there is one demo schema in `schemas/demo_schema.json`
   - User, community and official schemas should be supported.
     - ROADMAP: download and install new schemas
  
### Command line 
- Having the ability with the main program to run the command `project_start init` or `project_start install {schema name}`
- Prevent the user from having to remember a ton of command line arguments

### Plugins
As the project is being built with Deno, I want to take advantage of being able to evalute javascript functions, to create plugins to "super charge" schemas and better user experience. *(note: I used the words super charge because it's good for marketing right?)*

## Currently

As it stands, the application, will parse schema files, and execute the file. Included is: 

- Allow selection of schema
- Allow selection of options
- Parse Schema Files and Execute
- Parse Variables in Schemas

## Road Map

Yeah I need to update this


