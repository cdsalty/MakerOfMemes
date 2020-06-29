# What it do?

<p>allows you to randomly get a meme and add your own captioning. You can then click to copy the link and send it to others</p>

# But Why?

- why not?
- practice, practice, practice
- Using Hooks, Routing

## NPM MODULES:

- use-clipboard-copy (for copying the img url to the user's clipboard)
- react-router-dom (routing)
- useHistory, useEffect, useState

### Other...

- Documentation for API: https://api.imgflip.com --- Need to create a free account

  - this API only accepts form data(a form data object) to build the body for the POST request.
  - it will not be a json request but a one of form data. (new to me)

  - In essense, I am making an API get request and then a POST request to get the data and display it.

* want to be familiar working with CSS modules

#### THINGS I LEARNED OR THOUGHT WORTH MENTIONING

- Create/Convert to Array format; take the index position of the current memes and get the value from "box_count". (box_count: 3); fill the count with "". (strings)
  - box_count refers to the amount of captions the user can make. This tells me how many empty inputs I need to display.
    setCaptions(Array(memes[memeIndex].box_count.fill(""));
