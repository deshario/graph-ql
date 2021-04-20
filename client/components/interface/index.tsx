export interface LayoutInterface {
  isMobNavOpen?:boolean
  children:any
}

export interface NavInterface {
  router:any,
  isMobNavOpen:boolean,
  setMobNavOpen:any
}

export interface PostsInterface {
  payloads:any
}

export interface FlexBoxInterface {
  display?: string;
  direction?: string;
  padding?: string;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  justifyContent?: string;
  algItems?: string;
  bg?: string;
  hideonMobile?: string;
}

export interface AttachmentInterface{
  hide?:boolean
}

export interface ListInterface{
  marginTop?: string
}

export interface CardBoxInterface{
  padding?: string
  mTop?: string
  mLeft?: string
  mRight?: string
  hideonMobile?: string
};