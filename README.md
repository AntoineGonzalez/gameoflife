# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Jeu de la vie
​
# Règles du jeu
​
---
​
Le jeu de la vie est un « [jeu](https://fr.wikipedia.org/wiki/Jeu) à zéro joueur », puisqu'il ne nécessite pas l'intervention du joueur lors de son déroulement. Il s'agit d'un [automate cellulaire](https://fr.wikipedia.org/wiki/Automate_cellulaire), un modèle où chaque état conduit mécaniquement à l'état suivant à partir de règles pré-établies.
​
Le jeu se déroule sur une grille à deux dimensions, théoriquement infinie (mais de longueur et de largeur finies et plus ou moins grandes dans la pratique), dont les cases — qu'on appelle des « cellules », par analogie avec les cellules vivantes — peuvent prendre deux états distincts : « vivante » ou « morte ».
​
Une cellule possède huit voisins, qui sont les cellules adjacentes horizontalement, verticalement et diagonalement.
​
À chaque étape, l'évolution d'une cellule est entièrement déterminée par l'état de ses huit voisines de la façon suivante :
​
- une cellule morte possédant exactement trois voisines vivantes devient vivante (elle naît) ;
- une cellule vivante possédant deux ou trois voisines vivantes le reste, sinon elle meurt.
​
# Structures
​
---
​
## Structures stable
​
Les [structures stables](https://fr.wikipedia.org/wiki/Structure_stable_(automate_cellulaire)) (en anglais still life) sont des ensembles de cellules ayant stoppé toute évolution : elles sont dans un état stationnaire et n'évoluent plus tant qu'aucun élément perturbateur n'apparaît dans leur voisinage. Un [bloc](https://fr.wikipedia.org/wiki/Bloc_(jeu_de_la_vie)) de quatre cellules est la plus petite structure stable possible.
​
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a153379d-7ea4-4923-92ae-6192e3ab9eb5/Untitled.png)
​
## Oscillateurs
​
Les [oscillateurs](https://fr.wikipedia.org/wiki/Oscillateur_(automate_cellulaire)) se transforment de manière cyclique, en revêtant plusieurs formes différentes avant de retrouver leur état initial. Des figures de ce type sont très nombreuses : on en connaît actuellement des centaines[3](https://fr.wikipedia.org/wiki/Jeu_de_la_vie#cite_note-3). La « grenouille » est une structure qui se répète toutes les deux générations.
​
Elles peuvent apparaître relativement facilement dans l'univers de jeu par l'évolution spontanée de « graines » beaucoup plus simples.
​
![Gol-toad.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f7da38d-c18e-440e-bd14-82c03be393cc/Gol-toad.gif)
​
## Vaisseaux
​
Les [vaisseaux](https://fr.wikipedia.org/wiki/Vaisseau_(automate_cellulaire)) — ou navires — (en anglais spaceships, « vaisseaux spatiaux ») sont des structures capables, après un certain nombre de générations, de produire une copie d'elles-mêmes, mais décalée dans l'univers du jeu.
​
Le déplacement d'un vaisseau qui retrouve après n étapes sa configuration initiale déplacée de A cases horizontalement et de B cases verticalement est noté A-B, et sa vitesse (A, B)c/n, où c représente la « vitesse de la lumière » dans le jeu de la vie, c'est-à-dire la vitesse maximale d'une cellule par génération. L'existence de vaisseaux de type A - B pour A et B quelconques a été démontrée 
​
![Gol-glider.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ff6fb0b2-b4dc-4c30-9c89-065be248e61c/Gol-glider.gif)
​
## Puffers
​
Les puffeurs (de l'anglais puffer, « générateur de fumée ») sont des configurations qui se déplacent en laissant derrière elles une traînée constituée de débris.
​
## Canons
​
Les [canons](https://fr.wikipedia.org/wiki/Canon_(automate_cellulaire)), ou lanceurs, ou encore lances-navires (en anglais guns) sont en quelque sorte des oscillateurs lâchant des débris, capables de produire des vaisseaux, à un rythme variable (toutes les 15, 23, 30 ou 360 générations par exemple, ou bien de manière apparemment imprévisible pour les lance-navires.
​
De telles structures peuvent être créées à partir de puffeurs que l'on modifie afin que les débris s'agencent sous forme de navires. Le premier canon à avoir été découvert émet un planeur toutes les 30 générations.
