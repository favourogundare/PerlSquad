#### TEAM NAME: PerlSquad <perlsquadou@gmail.com>
- Alex Mayle <am218112@ohio.edu>
- Brian Reynolds <br058215@ohio.edu> 
- Eric Keep <ek349112@ohio.edu> 
- Favour Ogundare <fo893113@ohio.edu> 
- Robert Smith <rs659612@ohio.edu> 

#### CLIENT: Dr. Danielle Dani <drdani@gmail.com>

### Overview
This is a web game to teach middle-schoolers about biologicol biomes. The game is a linear
story involving the traversal of each biome, collecting information, and then playing minigames
that test the user's understanding.

### Branches
Master is, of course, our main development branch with the latest commits. Release is basically
an alternative to tagging commits in the release branch that are of importance. We merge master
with release every milestone.

All of the other branches are old feature branches that are kept around for grading purposes.
For example, am_customization was the branch for Alex Mayle to implement customization while
Bryan Reynolds worked on his own branch, but then responsibilities shifted and Alex no longer
worked on customization. The branch is there because it was set up, and we don't want to delete
it until any grades that depend on it are in. We will go through and delete old feature branches
that are no longer needed for grading around each sprint.

### Installation
It is a web app. Go to http://biomegame.online.

### Where Everything Is
If you are looking for sprint or homework related materials, such as team member responsibilities
check the artifacts folder. 

If you are looking for the deployment url, it's under qr_code folder. Also above. 

### Repo Structure
- javascripts: bulk of the game, including the game engine and code for each piece of the game
- artifacts: documents relating to the project as a whole and materials from sprints and homework
- docs: API reference and documentation for the various javascript classes and functions
- analytics: code involving the creation and transmission of analytic data
- Pictures: bitmap assets
- qr_code: Contains QR Code to http://biomegame.online.
- jasmine: artifacts from jasmine unit testing, should be moved to artifacts folder soon
