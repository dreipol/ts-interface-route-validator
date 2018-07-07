export interface IVideoTeaserPlugin {
    content: IVideoTeaserPluginContent;
    type: string;
}

export interface IVideoTeaserPluginContent {
    title: string;
    lead: string;
    link: ILink;
}


export interface ILink {
    path: string;
    label: string;
}
