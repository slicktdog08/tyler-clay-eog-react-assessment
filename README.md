## Create React App Visualization

To run please clone the project directory and run `yarn install` then `yarn start`

More information about the author of this project can be found at [tylerclay.tech](https://tylerclay.tech)

For your convenience a build of this project is hosted at [eog.tylerclay.tech](https://eog.tylerclay.tech)

Project is hosted using AWS S3, CloudFront, and Route 53

The instructions given for this project can be found here [here](https://react.eogresources.com)

Project looks like it was created from a `npx create-react-app`

Utilizes react-scripts - No Server-Side-Rendering Present (CSR)

Live rendering of data is present along with historical values

Known Weakness: The tooltip for the chart does not persist through state updates.
To resolve this behaivor I would have to persist the state myself in code and hydrate it after React finished a new render
I can fix this if desired, however I wanted to get this assessment over to you guys quickly!

Please check these Github issues for more info on this issue with recharts:<br/>
[Issue 1220](https://github.com/recharts/recharts/issues/1220)<br/>
[Issue 553](https://github.com/recharts/recharts/issues/553)<br/>
[Demo of Issue](https://codesandbox.io/s/6x979p8rr3)<br/>

I could fix this issue by writing some code to workaround the issue in the recharts library

Please let me know if you would like me to fix this and I will

Thank you for the opportunity to complete this assessment!