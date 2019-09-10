## Create React App Visualization

This assessment was bespoke handcrafted for tyler-clay.

Read more about this assessment [here](https://react.eogresources.com)

This project was bootstraped already

Looks like it was created from a create-react-app

Utilizes react-scripts

No Server-Side-Rendering Present

Live rendering of data is present along with historical values

Known Weakness: The tooltip for the chart does not persist through state updates.
To resolve this behaivor I would have to persist the state myself in code and hydrate it after React finished a new render
I can fix this if desired, however I wanted to get this assessment over to you guys quickly!

Please check these Github issues for more info on this issue with recharts
[Issue 1220](https://github.com/recharts/recharts/issues/1220)
[Issue 553](https://github.com/recharts/recharts/issues/553)
[Demo of Issue](https://codesandbox.io/s/6x979p8rr3)

I could fix this issue by writing some code to workaround the issue in the framework

Please let me know if you would like me to fix this and I will