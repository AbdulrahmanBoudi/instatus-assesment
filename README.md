# instatus-assesment
This is an event tracking app. To view the app, please visit the following link:
https://main--resilient-caramel-375364.netlify.app
(note that the loading is slow, due to the deployment server, so please be patient with it)

You can create events on this app, and they will appear in the event tracking table, displaying the actor, the target if exists, and the action. 
Youy can click on any event in the table to see all the details.
You can also use the search bar to search for events which include the searched upon text in the actor id, actor name, email and action.

On the top of the screen, you will find 2 mock buttons that allow you to create event. The first mock button logs a user in (and creates the user if the email was not previously registered).
the second button is merely to represent the behavior of having an actor modify a target's data. Enter an actor's email and a target's email and the modificatoon event will be created.
Please Note that there is no validation on these fields, as they are just to mock the behavior, make sure that the emails used in the modification are already registed. 
Also note that if you log a registered user in with a mismatching username and email, the user will get an updated username.


