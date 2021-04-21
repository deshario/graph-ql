import { atom } from 'recoil';

export interface PostType{
  content?:string,
  attachment?:any
}

const newDefaultPost = atom<PostType>({
  key: 'newDefaultPostKey',
  default: {
    content:'',
    attachment:null
  }
});

export default newDefaultPost