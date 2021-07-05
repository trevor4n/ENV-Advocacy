![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 
# Environmental Advocacy Hub (EAH) - <br>🌱 bite-sized environmental data! ♻️
## FLEX 323, July 4th, 2021  
<p align="center">
  <img src="https://user-images.githubusercontent.com/44274876/124508378-6cca6080-dd95-11eb-9de9-48a7379d942e.jpg" alt='Environmental Advocacy Hub homepage'>
 </p>


### &#x1F534; Introduction
Environmental engagement ebbs and flows in our culture just like our personal lives. Despite our best efforts and intentions, we simply don't have enough time to deep dive into everything. EAH was built to make environmental education efficient and approachable. Unlike local weather patterns, which we casually notice, the climate of our planet carries momentum. That's exactly why our choices today can have such a powerful impact down the road. Information can empower us to make intelligent decisions beneficial in the long-term. Whether you're pursuing the journey of a visitor or curator... *Environmental Advocacy Hub is going places -* [watch it run!](https://trevor4n.github.io/Sutton/)
### &#x1F534; Description
**Users:** Anyone who has been overwhelmed by social media competition for attention - anyone fed up with promotion - anyone ready to pledge themselves to a worthy cause.

**Problem:** Environmental advocacy organizations have been empowered by social media, enabling them to easily expand their audience. Social feeds quickly grab audience attention but inherently struggle with retention. Advocacy orgs could benefit from an app intentionally built to redirect like-minded users directly to their org's domain.

**Purpose:** An app that seeks first to understand what topics the user is interested in.  An app that identifies a fitting org to motivate the user. An app that encourages impactful *avenues of change* that will lead to widespread movement instead of reposting. EAH is a service designed to be left behind!


### &#x1F534; Technologies used
 - Express
 - Node.js
 - Mongoose
 - EJS templates for server-side rendering
 - MaterializeCSS design framework
 - PassportJS authentication
 - **[Heroku (Hosted)](https://trevor4n.github.io/Sutton/)**


### &#x1F534; User Stories
### MVP
 - [x] As a visitor, I want to find motivation, so that I can do something different today
 - [x] As a visitor, I want to read a curated snippet of verified environmental data, so that I can understand the urgency behind organizations of change
 - [ ] As a visitor, I want to be able to re-roll snippets, so that I can read topical info that speaks to me
 - [x] As a curator, I want to add snippets via CRUD, to diversify the user's experience

> ### 🚧 Icebox Goals - features under construction (check back in!)
> - [ ] As a visitor, I want to be able to filter topics, so that I can receive suggestions I'm interested in learning more about
> - [ ] As a visitor, I want to choose between orgs relating to the current snippet, so that I can focus my attention
> - [ ] As a visitor, I want to read a brief summary for each org, so that I can begin to understand the relationship between advocacy orgs, data, and the environment
> - [ ] As a visitor, I want the app to ELIF (explain like I'm five), so that I pursue redirecting to an advocacy website for more educational material (instead of their donations/contributions/social media page)
> - [ ] As a visitor, I want to be able to filter topics, so that I can receive suggestions I'm interested in learning more about
> - [ ] As a visitor, I want the app to display a recent redirects feed, so that I can see what other visitors are interested in
> - [ ] As a visitor, I want snippet refs to render orgs via animation and sources to render org redirects, so that a new tab isn't opened until the user is shown an *avenues of change* flow
> - [ ] As a curator, I want to be able to hide/unhide orgs/snippets, so they aren't permanently delete them


### &#x1F534; Major Hurdles
The biggest hurdle I overcame this project was adding authentication for curators. I was able to ensure that visitors aren't required to login to view snippets.  All the while, curators who connect their google account have full crud access! I also found implementing the Materialize sidenav was challenging due to out of date documentation.  Eventually, sidenav got running; however, this was at the expense of building a mobile friendly layout.  I plan on continuous updates and project maintenance.


### &#x1F534; Wireframes
Randomized Snippet
![image](https://user-images.githubusercontent.com/44274876/124509375-7785f500-dd97-11eb-96be-b3055d3a3953.png)
Sidenav - Visitor
![image](https://user-images.githubusercontent.com/44274876/124509743-08f56700-dd98-11eb-82c6-62d5184b26f0.png)
Sidenav - Curator (Authenticated via PassportJS)
![image](https://user-images.githubusercontent.com/44274876/124509851-3e9a5000-dd98-11eb-9128-5d5bf0af67ad.png)
Snippet Index Route
![image](https://user-images.githubusercontent.com/44274876/124509924-625d9600-dd98-11eb-9284-e8dfb294b772.png)
Snippet Show Route
![image](https://user-images.githubusercontent.com/44274876/124509992-891bcc80-dd98-11eb-87c8-6b79244478ef.png)
Snippet New Route
![image](https://user-images.githubusercontent.com/44274876/124510046-a9e42200-dd98-11eb-9b7c-c18b86b8cda5.png)
Snippet Edit Route
![image](https://user-images.githubusercontent.com/44274876/124510098-c7b18700-dd98-11eb-9974-c757278fa023.png)
Footer - Mobile View

![image](https://user-images.githubusercontent.com/44274876/124509217-25dd6a80-dd97-11eb-87c4-6c4e241a1ece.png)


### &#x1F535; Major Wins
- Tackles a concrete issue with a unique solution!
- User Stories with multiple roles
- Many-to-Many . . . -to-Many (Curators-to-Snippets-to-Organizations)

*This portfolio project is my first official full-stack application!*