# Adding input fields to wizard. Tutorial 2 (*UNDER CONSTRUCTION!*)

This tutorial covers the following:
- How to add input fiends to wizard
- How to fetch data from SharePoint using REST services

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```
This is a follow-up tutorial to [SharePoint Multi-Step Wizard Using React and TypeScript. Tutorial 1](SharePoint Multi-Step Wizard Using React and TypeScript. Tutorial 1). So be sure to do those steps first.

Now you should have created all the components you want to use in your wizard and integrated them to the main. The next step is to add input fields and bind them to the data in SharePoint. Make sure you are now running your application in the SharePoint online test environment, because the REST service won’t work in local. If you are not sure how to do so, please refer to the section “Preview the web part in SharePoint” [here](https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/build-a-hello-world-web-part). Also, please create a list (my list’s name will be ‘Clients’) in your SharePoint tenant to test the app.

My wizard is going to retrieve a specific list from SharePoint through the SharePoint REST service. Follow this link for more information: https://dev.office.com/sharepoint/docs/sp-add-ins/working-with-lists-and-list-items-with-rest.

1.	First, let’s create a dropdown menu to StepOne with the <select> tag. As we don’t have any options yet, the dropdown is empty.

2.	Go to main and create an interface for the list items like this:

```bash
export interface IListItem {
  Title?: string;
}
```

PS! As the IListItem will store values that are needed in multiple components, it must be kept in one place. In this example, we store that kind of code in Main.

3.	Import it to StepOne (with curly braces, like this: ```import { IListItem } from '../main/Main';```) and construct a generic component named items under the StepOne’s render method:

```bash
const items: JSX.Element[] = this.state.listItems.map(
    (item: IListItem, i: number): JSX.Element => {
       return (
          <option value={item.Title}>{item.Title}</option>
       );
    }   
);
```

This creates the ```<option>``` tag that will later be rendered between the ```<select>``` tags.

4.	To put this aside for a minute, we first need to get the clients from the list. For this, we need to make a method under StepOne that would retrieve that list from your SharePoint account and put the list items in the dropdown. This is a bit complicated so I will break it into parts.

4.1.	 First, you need to make sure you have all the props you need. Go to MultiPageWizWebPart.tsx under the multiPageWiz folder. Currently it holds the code for the property pane. You can use it later to create configuration settings for your app, but right now you can delete or ignore everything that is below getPropertyPaneConfiguration(). Important place here is the render method. This doesn’t exactly render anything, but passes on properties to main.
In order to pass on the properties, they must be defined in the IMultiPageWizProps.ts in the components folder. Paste this code:

```bash
import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface IMultiPageWizWebPartProps {
spHttpClient: SPHttpClient;
    httpClient: HttpClient;
    siteUrl: string;
}
```

Then amend the MultiPageWizWebPart.tsx render method like this:

```bash
…
MultiPageWiz,
{
spHttpClient: this.context.spHttpClient,
httpClient: this.context.httpClient,
siteUrl:  this.context.pageContext.web.absoluteUrl
}
…
```

4.2.	Then, import SPHttpClient and SPHttpClientResponse from @microsoft/sp-http.

4.3.	 Then create a method that uses the REST service for reading the clients in the list. I called my method readItems():

```bash
private readItems(): void {
this.props.spHttpClient.get(
`${this.props.siteUrl}/_api/web/lists/getbytitle('Clients')/items?$select=Title’,
SPHttpClient.configurations.v1, {
      headers: {
      'Accept': 'application/json;odata=nometadata',
      'odata-version': ''
      }
})
}
```

Note that this.props.siteUrl is the url of the site you are currently at.
‘Clients’ in the API is the name of my list that I am fetching. /items?$select=Title fetches the title column in the list. That’s sufficient , as we only need client names.
HttpClientConfigurations.v1 provides standard predefined HttpClientConfiguration objects for use with the HttpClient class. You can read about the sp-http classes here.

4.4.	Then add a response. Simply put it after spHttpClient.get:

```bash
.then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
return response.json();
})
```

In my example I use JSON as the response format, you can also fetch it in xml if it suits you better.

In order to be able to store the fetched list items in the array, you need to define it’s state. For this create a constructor in the StepOne class:

```bash
constructor(props) {
        super(props);
        this.state =  {
            listItems: []
        }
        this.readItems();
}
```

4.6.	Then you store the fetched list items to the created listItems array by amending the following to your readItems method:

```bash
.then((response: { value: IListItem[] }): void => {
  this.setState({
      listItems: response.value
  });
  },
  (error: any): void => {
      console.log(error);
  }
);
```
